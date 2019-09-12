var fs = require("fs")
const census = require('citysdk')
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

var methods = {
    getCart: () =>
    // 40.8581292, -74.2053012
    census(
      { 
        "vintage": 2015,
        "geoHierarchy": {  "zcta":  {"lat": 40.8581292, "lng": -74.2053012 } },
        "geoResolution": "500k"
      }
    )
}

module.exports = methods