const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const readline = require('readline');
const google = require('./Services/google')
const city = require('./Services/citysdk')
const cartography = require('./Services/cartography')
var path = require('path');
var root = path.dirname(require.main.filename);
const zipwriter = require('./mongo/zipwriter')
const tractWriter = require('./mongo/tractWriter')

// init config
const app = express();
app.use(express.static('map-data'))

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

// get photo endpoint
app.get('/api/photos/:ref/:width/:height', (req, res) => {
  google.getPhoto(req.params.ref, req.params.width, req.params.height, (data) => {
  //  res.setHeader('Content_Type', 'application/json');
    res.send(data)
  })
})

////////////////// Demographics ////////////////////

// get population //40.8581292 //-74.2053012
app.get('/api/demo/population/:lat/:lng', (req, res) => {
  city.getPopulation(req.params.lat, req.params.lng, (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  })
})

// get age info
app.get('/api/demo/age/:lat/:lng', (req, res) => {
  city.getAge(req.params.lat, req.params.lng, (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  })
})

// get income 
app.get('/api/demo/income/:lat/:lng', (req, res) => {
  city.getIncome(req.params.lat, req.params.lng, (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  })
})

// get social
app.get('/api/demo/social/:lat/:lng', (req, res) => {
  city.getSocial(req.params.lat, req.params.lng, (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  })
})

// get tract
app.get('/api/demo/tract/:lat/:lng', (req, res) => {
  city.getSocial(req.params.lat, req.params.lng, (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  })
})


////////////////// Cartography ////////////////////
app.get('/api/cartography/zip/:state/:zip', (req, res) => {
  console.log(root)
  cartography.getCart(req.params.state, req.params.zip, (data) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(data)
  })
})

app.get('/api/cartography/tract/:state/:tract', (req, res) => {
  console.log(root)
  cartography.getCart(req.params.state, req.params.zip, (data) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(data)
  })
})