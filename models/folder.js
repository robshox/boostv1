
var mongoose = require('mongoose');

var folderSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Folder', folderSchema);
