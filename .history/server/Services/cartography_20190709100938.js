var fs = require("fs")
const census = require('citysdk')
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

var methods = {
    getCart: () =>
    // 40.8581292, -74.2053012
    census(
      { 
        "vintage": 2014,
        "geoHierarchy": { "state": { "lat": 28.2639, "lng": -80.7214 }, "county": "*" },
        "geoResolution": "500k"
      },
      (err, res) => console.log(res)      
    )
}

module.exports = methods