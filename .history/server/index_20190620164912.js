
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const google = require('./google')
const city = require('./citysdk')

// init config
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.disable('etag');

app.listen(3001, () => {
  console.log('Express server is running on localhost:3001')
}
);

// geocode
app.get('/api/geocode/:location', (req, res) => {
  var f_address = req.params.address.toString().replace('+', / /g)
  google.geoCode(f_address, (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  })
})

// nearby places endpoint
app.get('/api/places/:lat/:lng/:search/:type/:distance', (req, res) => {
  console.log('get places')
  google.getNearBy(req.params.lat, req.params.lng, req.params.search, req.params.type, Number(req.params.distance), (data) => {
        
      res.setHeader('Content-Type', 'application/json');
      res.set('Pragma', data.next_page_token)
      res.send(data.results);
  })
})

// next page end point
app.get('/api/places/:token', (req, res) => {
  google.getNearByNextPage(req.params.token, (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.set('Pragma', data.next_page_token)
    res.send(data.results);
  })
})
