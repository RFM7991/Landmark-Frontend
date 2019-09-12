var fs = require("fs")
const census = require('citysdk')
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

var methods = {
    getCart: (callback) =>
    census({
        "vintage" : 2017,
        "geoHierarchy" : {
        "metropolitan statistical area/micropolitan statistical area": "*"
        },
        "geoResolution" : "500k", // required
        "statsKey" : KEY
    }, 
    (err, res) => {
        callback(res)
        fs.writeFile("./directory/filename.json", 
        JSON.stringify(res), 
        () => console.log("done")
    )}
    )
}

module.exports = methods