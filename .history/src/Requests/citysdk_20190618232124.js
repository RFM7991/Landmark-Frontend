import census from 'citysdk'
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

export function testCall() {
    census({
        "vintage" : 2015,             // required
        "geoHierarchy" : {            // required
          "county" : {
            "lat" : 28.2639, 
            "lng" : -80.7214
          }
        },
        "sourcePath" : ["cbp"],        // required 
        "values" : ["ESTAB", "NAME"],          // required 
        "statsKey" : KEY // required for > 500 calls per day
      }, 
      (err, res) => console.log(res)
    )
}

export function medianAge() {
    census({
        "vintage" : 2015,             // required
        "geoHierarchy" : {            // required
          "place" : {
            "lat" : 40.8581292, 
            "lng" : -74.2053012
          }
        },
        "sourcePath" : ["acs", "acs5"],        // required 
        "values" : ["B06002_001E", "NAME"],          // required 
        "statsKey" : KEY // required for > 500 calls per day
      }, 
      (err, res) => console.log(res)
    )
}