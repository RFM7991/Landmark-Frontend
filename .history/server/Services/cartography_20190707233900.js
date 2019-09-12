var fs = require("fs")
const census = require('citysdk')
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

var methods = {
    getCart: () =>
    census({
        "vintage": 2014,
        "geoHierarchy": { "state": { "lat": 28.2639, "lng": -80.7214 }, "county": "*" },
        "geoResolution": "500k",    
        "statsKey" : KEY,
      },
    )
}

module.exports = methods