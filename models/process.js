var mongoose = require('mongoose');

var processchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Process', processSchema);
