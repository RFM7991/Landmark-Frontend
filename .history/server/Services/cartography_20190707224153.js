var fs = require("fs")
const census = require('citysdk')
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

var methods = {
    getCart: (callback) =>
    census({
        "vintage" : 2015,
        "geoHierarchy" : {            
            "metropolitan statistical area/micropolitan statistical area": "*"
          },
        "geoResolution" : "5m"
    }, 
    (err, res) => {
     //   callback(res)
     
     /*   fs.writeFile("./directory/filename.json", 
        JSON.stringify(res), 
        () => console.log("done")
    
    ) */
    console.log(res)
    }
    )
}

module.exports = methods