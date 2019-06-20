import census from 'citysdk'

export const UPDATE_PLACES = 'places:updatePlaces';

export function updatePlaces(newPlaces) {
    return {
      type: UPDATE_PLACES,
      payload: {
        places: newPlaces
      }
    }
}

export function testCity() {
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
    "statsKey" : "<your key here>"
  }, 
  (err, res) => console.log(res)
)
}
