import census from 'citysdk'
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

export function testCall() {
    census({
        "vintage" : 2015,        // required
        "geoHierarchy" : {       // required  
          "county" : {
            "lat" : 28.2639, 
            "lng" : -80.7214
          }
        },
        "sourcePath" : ["cbp"],  // required 
        "values" : ["ESTAB"], // required 
        "predicates" : {                
            "B01001_001E" : "0:100000"  // number range separated by `:`
        },
        "statsKey" : KEY     
      }, 
      (err, res) => console.log(res)
    )
}