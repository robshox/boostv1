var express = require('express'); // Server
var bodyParser = require('body-parser'); // Parse API request body
var mongoose = require('mongoose'); // Model creation for Mongo
var Folder = require('./models/folder'); // Folder model for mongoose
var Process = require('./models/process');
var config = require('./config'); // Imports Mongo Address setttings
var logger = require('morgan'); // Logger
var jwt = require('express-jwt'); // Authentication
var cors = require('cors'); // Authentication

var data = { rob: 'testrob' }; // This is the data being written to which we need to change.
var folderData = { folderStuff: 'folderData'}

var jedis = [
  {
    id: 1,
    name: 'Luke Skywalker',
    image: 'http://localhost:7000/images/luke-skywalker.jpg'
  },
  {
    id: 2,
    name: 'Anakin Skywalker',
    image: 'http://localhost:7000/images/anakin-skywalker.png'
  },
  {
    id: 3,
    name: 'Yoda',
    image: 'http://localhost:7000/images/yoda.png'
  },
  {
    id: 4,
    name: 'Obi-Wan Kenobi',
    image: 'http://localhost:7000/images/obi-wan-kenobi.jpg'
  },
  {
    id: 5,
    name: 'Mace Windu',
    image: 'http://localhost:7000/images/mace-windu.jpg'
  }
];

const authCheck = jwt({
  secret: 'AUTH0_SECRET',
  audience: 'AUTH_CLIENT_ID'
});

express()
.use(cors()) // Authentication
.use(express.static(__dirname + '/public')) // Setup static directory
.use(bodyParser.urlencoded({ extended: true }))
.use(bodyParser.json())
.use(logger(':method :url :status :response-time ms - :res[content-length]'))
.post('api/test', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' }); //Use postman post localhost:3333/test to test
})
.post('/api/folder', function(req,res) {
  var folder = new Folder(); // Create an new mongoose folder schema
  folder.name = req.body.name; // Save folder name from body urlencoded
  //console.log( folder._id );
  folder.save(function(err) {
    if (err)
      res.send(err); // Switch this off when in production
    res.json(folder); // Return saved object with ObjecId from MongoDB { __v: 0, name: 'Test3', _id: 59688b2e486ce3219a75e6bf }
 });
})
.post('/api/process', function(req, res) {
    var process = new Process();// Create a new mongoose folder schema
    process.name = req.body.name;
    //process.details = req.body.details;
   // convertStringFolder = parseInt(req.body.folder);
    console.log(req.body.folder_name);
    //var convertId = new mongoose.Types.ObjectId(req.body.folder_id);
    //console.log( typeof convertId);
    process.folder_name = req.body.folder_name;

    console.log( process.name );

    process.save(function(err){
        if (err)
            res.send(err);
        res.json(process);
        console.log('Process was saved success')

    });
})
.get('/api/process/:folder_id', function(req,res) {

    Process.find({ 'folder_name': req.params.folder_id }, function (err, processes) {
      if (err)
        res.send(err);
        res.json(processes);
      });

})
.get('/api/getfolders', function(req,res) {

    Folder.find(function(err, turkeys) {
        if (err)
            res.send(err);
            res.json(turkeys);
    });

})
.get('/api/jedis/:id', authCheck, (req, res) => {
  res.json(jedis.filter(jedi => jedi.id === parseInt(req.params.id))[0]);
})
.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html')) // Needs to be last in chain
.listen(8080);

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?1');
});
