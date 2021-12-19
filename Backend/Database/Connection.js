const { MongoClient, MongoInvalidArgumentError } = require('mongodb');
const uri = "mongodb+srv://root:9TXLxnV51lOV7IQr@cluster0.nythh.mongodb.net/Medici?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "Medici"

module.exports = {
    connectDatabase: async function () {
        await client.connect()
    },

    insertOneDocument: async function (collectionName, document) {
        try {
            const collection = client.db(dbName).collection(collectionName)
            let user = await collection.insertOne(document)
            return (user)
        } 
        catch (error) {
            if(error instanceof MongoInvalidArgumentError){
                throw "Invalid argument"
            }
            else{
                throw error
            }
        }
    },

    getAllDocuments: async function (collectionName) {
        try {
            const collection = client.db(dbName).collection(collectionName)
            let documents = await collection.find("")
            documents = await documents.toArray()
            return (documents)
        } 
        catch (error) {
            if(error instanceof MongoInvalidArgumentError){
                throw "Invalid argument"
            }
            else{
                throw error
            }
        }
    },

    getOneDocument: async function (collectionName, query) {
        try{
            const collection = client.db(dbName).collection(collectionName)
            let documents = await collection.findOne(query)
            return (documents)
        }
        catch (error) {
            if(error instanceof MongoInvalidArgumentError){
                throw "Invalid argument"
            }
            else{
                throw error
            }
        }
    },

    getManyDocuments: async function (collectionName, query) {
        try {
            const collection = client.db(dbName).collection(collectionName)
            let documents = await collection.find(query).toArray()
            return(documents)
        } 
        catch (error) {
            if(error instanceof MongoInvalidArgumentError){
                throw "Invalid argument"
            }
            else{
                throw error
            }
        }
    },

    getAllDocumentsPagination: async function (collectionName, offset, limit) {
        try {
            const collection = client.db(dbName).collection(collectionName)
            let documents = await collection.find("").skip(offset).limit(limit).toArray()
            return documents
        } 
        catch (error) {
            if(error instanceof MongoInvalidArgumentError){
                throw "Invalid argument"
            }
            else{
                throw error
            }
        }
    }, 

    modifyOneDocument: async function (collectionName, query, newData) {
        try {
            const collection = client.db(dbName).collection(collectionName)
            let updated = await collection.updateOne(query, newData)
            return(updated)
        } 
        catch (error) {
            if(error instanceof MongoInvalidArgumentError){
                throw "Invalid argument"
            }
            else{
                throw error
            }
        }
    },

    removeOneDocument: async function(collectionName, query) {
        try {
            const collection = client.db(dbName).collection(collectionName)
            let result = await collection.deleteOne(query)
            if(result.deletedCount == 0){
                throw "Could not find document"
            }
        } 
        catch (error) {
            if(error instanceof MongoInvalidArgumentError){
                throw "Invalid argument"
            }
            else{
                throw error
            }
        }
    },

    createCollection: async function(collectionName) {
        try {
            await client.db(dbName).createCollection(collectionName)
        } 
        catch (error) {
            if(error instanceof MongoInvalidArgumentError){
                throw "Invalid argument"
            }
            else{
                throw error
            }
        }
    },

    renameCollection: async function(oldName, newName) {
        try {
            await client.db(dbName).collection(oldName).rename(newName)
        } 
        catch (error) {
            if(error instanceof MongoInvalidArgumentError){
                throw "Invalid argument"
            }
            else{
                throw error
            }
        }
    }
}