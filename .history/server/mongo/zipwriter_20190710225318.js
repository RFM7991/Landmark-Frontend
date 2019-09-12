const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

const methods = {

    test : () => {
        var data = getStateBounds('NJ')
        var boundary;
        var collection = []
        for(var i = 0; i < data.features.length; i++) {
            var obj = data.features[i];
            obj.zip = data.features[i].properties.ZCTA5CE10
            collection.push(obj)
        } 
        writeMany(collection)
    },

    writeData : () => {
   //   writeToMongo()
    //  findData()
    }
}

function getStateBounds(state) {
    var data = require('../map-data/'+ state.toLowerCase() +'_zipcodes.json'); 
    return data
}

function writeGson(data) {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("gsonDb")
        dbo.collection("zip_gson").insertOne(data, (err, res) => {
            if (err) throw err;
            console.log(data.id, data.zip, "inserted")
            db.close();
        })
    })
}

function writeMany(data) {
    MongoClient.connect(url, { useNewUrlParser: true}, (err, db) => {
        var dbo = db.db("mydb")

        dbo.collection("customers").insertMany(data, (err, res) => {
            if (err) throw err;
            console.log("Number of docs inserted: ", res.insertedCount)
            db.close();
        })
    })
}
function writeToMongo() {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("mydb")
        var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("customers").insertOne(myobj, (err, res) => {
            if (err) throw err;
            console.log("1 doc inserted")
            db.close();
        })
    })
}

function findData() {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("mydb")
        dbo.collection("customers").findOne({}, (err, res) => {
            if (err) throw err;
            console.log(res)
            db.close()
        })
    })
}

module.exports = methods