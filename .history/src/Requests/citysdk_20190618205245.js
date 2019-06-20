import census from 'citysdk'

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
        "values" : ["ESTAB"]     // required 
      }, 
      (err, res) => console.log(res)
    )
}