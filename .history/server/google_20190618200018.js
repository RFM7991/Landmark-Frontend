import { isModuleSpecifier } from "@babel/types";

var methods = {}
methods = {

///////////////////////////////////////////////////////
// get nearby places
getNearBy: function(lat, lng, search, type, distance, callBack) {
    googleMapsClient.placesNearby({
      language: 'en',
      location: [lat, lng],
 //     radius: distance,
      rankby: 'distance',
      type: type
    }, function(err, response) {
    if (!err) {
      console.log('get nearby:', 'success');
    
      callBack(response.json)
    } else {
      console.log('Get Nearby:', 'Error', err)
     }
    })
},

// get nearby places
 getNearByNextPage: function(token, callBack) {
  googleMapsClient.placesNearby({
    pagetoken: token
  }, function(err, response) {
  if (!err) {
    console.log('get nearby-next page:', 'success');
    callBack(response.json)
  } else {
    console.log('Get Nearby:', 'Error', err)
   }
  })
},

// Geocode an address.
geoCode: function(add, callBack) {
  googleMapsClient.geocode({
    address: add.toString()
  }, function(err, response) {
    if (!err) {
      callBack(response.json.results)
  //   console.log(response.json.results);
    } else {
      console.log('Error:', err)
    }
  })
}
}

module.exports = methods;