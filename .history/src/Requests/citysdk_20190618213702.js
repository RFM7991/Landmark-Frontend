import census from 'citysdk'
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

export function testCall() {
    census({
        "vintage" : "2017",
        "geoHierarchy" : {
          "us" : "*"
        },
        "sourcePath" : ["acs", "acs1"],  
        "values" : ["B01001_001E"],
        "statsKey" : KEY
      }, 
      (err, res) => console.log(JSON.stringify(res))
      
    )
}