const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

const methods = {

    test : () => {
        var data = getStateBounds('NJ')
        var boundary;
        for(var i = 0; i < data.features.length; i++) {
            var obj = data.features[i];
            console.log(obj)
        } 
    }
}

function getStateBounds(state) {
    var data = require('../map-data/'+ state.toLowerCase() +'_zipcodes.json'); 
    return data
}

function writeToMongo(data) {
    MongoClient.connect(url, (err, db) => {
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

module.exports = methods