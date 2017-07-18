var mongoose = require('mongoose');

var processSchema = new mongoose.Schema({
  name: String,
  //details: String,
  folder_name: String/*{ type: String, ref: 'Folder'}*/
});

module.exports = mongoose.model('Process', processSchema);
