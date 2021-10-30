const express = require('express')
const bodyparser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID
//Has all MongoDb custom functions
const db = require('../../Database/Connection')
// Has all errors
const errors = require('../Error Messages/ErrorMessages')

//Collections inside of Database defined
const collection = "Admins"

// JWT secret code
const secret = require('../../Config.json').secret

const router = express.Router()

router.use(bodyparser.json())

//SESSION CREATE API 
// db.connectDatabase()

//LOGIN API
router.post("/login", async (req, res) => {
    let user = {
        "email": req.body.email,
        "password": req.body.password
    }
    try {
        var document = await db.getOneDocument(collection, {
            "email": user.email
        })
    } catch (error) {
        return res.json(errors.databaseError(error))
    }
    // If email doesnt exist
    if (!document) {
        res.json(errors.emailNotFoundError)
    } else {
        // Succesful login case
        if (bcrypt.compareSync(user.password, document.password)) {
            var token = jwt.sign({
                "_id": document._id
            }, secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.json({
                "header": {
                    "error": 0,
                    "message": "Admin Login Succesful",
                    "token": token
                },
                "body": {
                    "first_name": document.first_name,
                    "last_name": document.last_name,
                }
            })
        } 
        // Incorrect Password
        else {
            res.json(errors.incorrectPasswordError)
        }
    }
})

// //REGISTER API
// router.post("/register", async (req, res) => {
//     try {
//         var user = {
//             "first_name": req.body.first_name,
//             "last_name": req.body.last_name,
//             "email": req.body.email,
//             "phone_number": req.body.phone_number,
//             "address" : {
//                 "house_number" : req.body.house_number,
//                 "area" : req.body.area,
//                 "city" : req.body.city,
//                 "state" : req.body.state,
//                 "country" : req.body.country
//             },
//             "password": bcrypt.hashSync(req.body.password, 10),
//         }
//     } catch (error) {
//         res.json(errors.informationMissing)
//     }

//     let userFlag = await db.getOneDocument(userCollection, {
//         "email": user.email
//     })
//     // Registering already existing user
//     if (userFlag) {
//         res.json(errors.emailAlreadyExistsError)
//     } else {
//         try {
//             await db.insertOneDocument(userCollection, user)
//             res.json({
//                 "header": {
//                     "error": 0,
//                     "message": "Register Succesful"
//                 }
//             })
//         } catch (error) {
//             res.json(errors.databaseError(error))
//             console.log(error)
//         }
//     }
// })

module.exports = router
