var fs = require("fs")

var methods = {
    getCart: (callback) =>
    census({
        "vintage" : 2017,
        "geoHierarchy" : {
        "metropolitan statistical area/micropolitan statistical area": "*"
        },
        "geoResolution" : "500k" // required
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