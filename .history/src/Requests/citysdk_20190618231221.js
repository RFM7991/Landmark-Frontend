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
        "values" : ["ESTAB"],          // required 
        "statsKey" : KEY // required for > 500 calls per day
      }, 
      (err, res) => console.log(res)
    )
}

export function testCall(2) {
    census({
        "vintage" : 2015,             // required
        "geoHierarchy" : {            // required
          "county" : {
            "lat" : 28.2639, 
            "lng" : -80.7214
          }
        },
        "sourcePath" : ["acs"],        // required 
        "values" : ["B06002_001E"],          // required 
        "statsKey" : KEY // required for > 500 calls per day
      }, 
      (err, res) => console.log(res)
    )
}