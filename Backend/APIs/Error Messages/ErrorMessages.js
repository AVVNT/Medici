module.exports = {
    emailNotFoundError: {
        "header": {
            "error": 1,
            "message": "Email not found"
        }
    },
    incorrectPasswordError: {
        "header": {
            "error": 2,
            "message": "Incorrect Password"
        }
    },
    databaseError: function (error) {
        return {
            "header": {
                "error": 3,
                "message": error
            }
        }
    },
    emailAlreadyExistsError: {
        "header": {
            "error": 4,
            "message": "Email already registered"
        }
    },
    jwtNoTokenProvided: {
        "header": {
            "error": 5,
            "message": "No token provided"
        }
    },
    jwtAuthenticationFailed: {
        "header": {
            "error": 6,
            "message": "Failed to authenticate token"
        }
    },
    informationMissing: {
        "header": {
            "error": 7,
            "message": "Required information missing"
        }
    },
    categoryMissing: {
        "header": {
            "error": 8,
            "message": "Category doesn't exist"
        }
    },
    productAlreadyExists: {
        "header": {
            "error" : 9,
            "message" : "Product Already Exists"
        }
    },
    productNotFound: {
        "header": {
            "error" : 10,
            "message" : "Product doesn't exist"
        }
    },
    
}