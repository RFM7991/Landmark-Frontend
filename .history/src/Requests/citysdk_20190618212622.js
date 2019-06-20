import census from 'citysdk'
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

export function testCall() {
    census({
        "vintage" : "2017",
        "geoHierarchy" : {
          "state" : "51",
          "county" : "*"
        },
        "sourcePath" : ["acs", "acs1"],  
        "values" : ["NAME"],            
        "predicates" : {                
            "B01001_001E" : "0:100000"  // number range separated by `:`
        },
        "statsKey" : KEY
      }, 
      (err, res) => console.log(res)
    )
}