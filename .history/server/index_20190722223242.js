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
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;



if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    // init config
    var app = express();
    app.use(express.static('map-data'))
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(pino);
    app.disable('etag');

    app.all('/api/test', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})

    app.listen(3001, () => {
      console.log('Express server is running on localhost:3001')
    }
  );

    console.log(`Worker ${process.pid} started`);
  }

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
app.get('/api/demo/age/:range/:lat/:lng', (req, res) => {
  city.getAge( req.params.range, req.params.lat, req.params.lng, (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  })
})

// get income 
app.get('/api/demo/income/:range/:lat/:lng', (req, res) => {
  city.getIncome(req.params.range, req.params.lat, req.params.lng,  (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  })
})

// get social
app.get('/api/demo/social/:range/:lat/:lng', (req, res) => {
  city.getSocial(req.params.range, req.params.lat, req.params.lng, (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  })
})

// get tract
app.get('/api/demo/tract/:lat/:lng', (req, res) => {
  city.getTract(req.params.lat, req.params.lng, (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  })
})


////////////////// Cartography ////////////////////
app.get('/api/cartography/zip/:state/:zip', (req, res) => {
  console.log(root)
  cartography.getZipCart(req.params.state, req.params.zip, (data) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(data)
  })
})

app.get('/api/cartography/tract/:state/:tract', (req, res) => {
  console.log(root)
  cartography.getTractCart(req.params.state, req.params.tract, (data) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(data)
  })
})