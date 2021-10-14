const {
    MongoClient
} = require('mongodb')
const uri = "mongodb+srv://root:scsXq9aUPDKqHE@@cluster0.nythh.mongodb.net/test";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
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
    }
}