const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAApJlSsL7fsf9ElKRHLLOhEM2pZM00-ho'
});

// init config
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.disable('etag');

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

// geocode
app.get('/api/geocode/:location', (req, res) => {
  var f_address = req.params.address.toString().replace('+', / /g)
  geoCode(f_address, (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  })
})

// nearby places endpoint
app.get('/api/places/:lat/:lng/:search/:type/:distance', (req, res) => {
  console.log('get places')
  getNearBy(req.params.lat, req.params.lng, req.params.search, req.params.type, Number(req.params.distance), (data) => {
        
      res.setHeader('Content-Type', 'application/json');
      res.set('Pragma', data.next_page_token)
      res.send(data.results);
  })
})

// next page end point
app.get('/api/places/:token', (req, res) => {
  getNearByNextPage(req.params.token, (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.set('Pragma', data.next_page_token)
    res.send(data.results);
  })
})

// get nearby places
function getNearBy(lat, lng, search, type, distance, callBack) {
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
}

// get nearby places
function getNearByNextPage(token, callBack) {
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
}

// Geocode an address.
function geoCode(add, callBack) {
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