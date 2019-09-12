const PLACES_API = 'https://maps.googleapis.com/maps/api/place/'
const KEY = 'AIzaSyAApJlSsL7fsf9ElKRHLLOhEM2pZM00-ho'
const googleMapsClient = require('@google/maps').createClient({
  key: KEY
});
const fetch = require('node-fetch');
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
getPhoto: function(ref, width, height, callback) {
  fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=' + KEY
    /*PLACES_API + 'photo?key=' + KEY 
  + '&photoreference=' + ref 
  + '&maxwdith=' + width
  + '&maxheight=' + height,
  */,
  {
    method : 'GET'
  })
  .then(response => {
    console.log(JSON.stringify({url: response.url}))
  })
  //.then(data => callback(data))
  .catch(error => console.error('Photo Error:', error))
}

}

module.exports = methods;