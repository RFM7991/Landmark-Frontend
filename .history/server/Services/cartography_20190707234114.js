var fs = require("fs")
const census = require('citysdk')
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

var methods = {
    getCart: () =>
    census({
        "vintage": 2014,
        "geoHierarchy": { "state": { "lat": 40.8581292, "lng": -74.2053012 }, "zip-code-tabulation-area": "*"  },
        "geoResolution": "500k",    
        "statsKey" : KEY,
      },
    )
}

module.exports = methods