import census from 'citysdk'
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'
// https://api.census.gov/data/2017/acs/acs5/variables.html
export function testCall() {
    census({
        "vintage" : 2015,             // required
        "geoHierarchy" : {            // required
          "UA" : {
            "lat" : 40.8581292, 
            "lng" : -74.2053012
          }
        },
        "sourcePath" : ["acs", "acs5"],        // required 
        "values" : ["NAME", 
        "B00001_001E", // population
        "B00002_001E", // housing units
        "B01001_002E", // male
        "B01001_026E" // female
        ],          // required 
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