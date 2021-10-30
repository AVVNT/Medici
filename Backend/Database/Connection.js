const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://root:9TXLxnV51lOV7IQr@cluster0.nythh.mongodb.net/Medici?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "Medici"

module.exports = {
    connectDatabase: async function () {
        await client.connect()
    },

    insertOneDocument: async function (collectionName, document) {
        const collection = client.db(dbName).collection(collectionName)

        let user = await collection.insertOne(document)

        return (user)
    },

    getAllDocuments: async function (collectionName) {
        const collection = client.db(dbName).collection(collectionName)

        let documents = await collection.find("")
        documents = await documents.toArray()

        return (documents)
    },

    getOneDocument: async function (collectionName, query) {
        const collection = client.db(dbName).collection(collectionName)

        let documents = await collection.findOne(query)

        return (documents)
    },

    getManyDocuments: async function (collectionName, query) {
        const collection = client.db(dbName).collection(collectionName)
        let documents = await collection.find(query).toArray()
        return(documents)
    },

    modifyOneDocument: async function (collectionName, query, newData) {
        const collection = client.db(dbName).collection(collectionName)

        let updated = await collection.updateOne(query, newData)

        return(updated)
    },

    removeOneDocument: async function(collectionName, query) {
        const collection = client.db(dbName).collection(collectionName)
        let result = await collection.deleteOne(query)
        if(result.deletedCount == 0){
            throw "Could not find document"
        }
    },

    createCollection: async function(collectionName) {
        try {
            await client.db(dbName).createCollection(collectionName)
        } catch (error) {
            throw error
        }

        // client.db(dbName).createCollection(collectionName, function(err, result) {
        //     if (err) throw err;
        //     console.log("Collection is created!");
        // });
    },
}