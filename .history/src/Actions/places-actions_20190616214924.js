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
  "vintage" : 2015,    // required
  "geoHierarchy" : {   // required
    "county" : {
      "lat" : 28.2639, 
      "lng" : -80.7214
    }
  }
}, 
(err, res) => console.log('demo', res)
)
}
