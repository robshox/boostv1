var mongoose = require('mongoose');

var folderSchema = new mongoose.Schema({
  name: String,
  details: String,
  processes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Process' }]
});

module.exports = mongoose.model('Folder', folderSchema);
