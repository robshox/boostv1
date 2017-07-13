var mongoose = require('mongoose');

var processSchema = new mongoose.Schema({
  name: String,
  details: String,
  _folder: { type: String, ref: 'Folder'}
});

module.exports = mongoose.model('Process', processSchema);
