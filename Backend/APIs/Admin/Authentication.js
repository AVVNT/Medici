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
const collection = require('../../Config.json').adminsCategoryCollectionName

// JWT secret code
const secret = require('../../Config.json').secret

const router = express.Router()

router.use(bodyparser.json())

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

module.exports = router