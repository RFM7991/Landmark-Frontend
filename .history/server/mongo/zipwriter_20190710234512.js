const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"
const fs = require('fs')
var glob = require('glob')

const methods = {

    getStates : () => {
        console.log('glob')
        var states = []
        glob("server/map-data/*.json", (er, files) => {
            files.forEach(path => {
                var state = (path.split(/[\\/]/)[2]).slice(0, 2)
                states.push(state)
            })
            // post all states
            methods.postData(states, 0)
        })
    },

    postData : (states, ind) => {
        var index = ind
        var state = states[index]
        var data = getStateBounds(state)
        var collection = []
        for(var i = 0; i < data.features.length; i++) {
            var obj = data.features[i];
            obj.zip = data.features[i].properties.ZCTA5CE10
            collection.push(obj)
        } 
        console.log('input length', collection.length)
        writeMany(state, collection, (err, res) => {
            if (ind != states.length)
              methods.postData(states, ind++)

        })
    },

    writeData : () => {
   //   writeToMongo()
      findData("NJ", "07052")
    }
}

function getStateBounds(state) {
    var data = require('../map-data/'+ state.toString() +'_zipcodes.json'); 
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

function writeMany(state, data, callback) {
    MongoClient.connect(url, { useNewUrlParser: true}, (err, db) => {
        var dbo = db.db("zip_gson")

        dbo.collection(state).insertMany(data, (err, res) => {
            if (err) throw err;
            console.log("Number of docs inserted: ", res.insertedCount)
            db.close();
            callback(err, res)
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

function findData(state, zip_id) {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("zip_gson")
        dbo.collection(state).find({zip: zip_id}).toArray((err, res) => {
            if (err) throw err;
            console.log(res)
            db.close()
        })
    })
}

module.exports = methods