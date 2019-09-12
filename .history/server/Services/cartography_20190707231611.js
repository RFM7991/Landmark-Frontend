var fs = require("fs")
const census = require('citysdk')
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

var methods = {
    getCart: () =>
    census({
        "vintage" : "2017",
        "geoHierarchy" : {
          "zip-code-tabulation-area" : 07043
        },
        "sourcePath" : ["acs", "acs5"],  
        "values" : ["B19083_001E"], // GINI index             
        "statsKey" : KEY,
        "geoResolution" : "500k"
      },
    )
}

module.exports = methods