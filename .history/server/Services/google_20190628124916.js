const PLACES_API = 'https://maps.googleapis.com/maps/api/place/'
const KEY = 'AIzaSyAApJlSsL7fsf9ElKRHLLOhEM2pZM00-ho'
const googleMapsClient = require('@google/maps').createClient({
  key: KEY
});
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
},
// get photo
geoCode: function(ref, width, height, callback) {
  fetch(PLACES_API + 'photo?key=' + KEY 
  + '&photoreference=' + ref 
  + '&maxwdith=' + width
  + '&maxheight=' + height


  , 
  {
    method : 'GET'
  })
  .then(res)
}

}

module.exports = methods;