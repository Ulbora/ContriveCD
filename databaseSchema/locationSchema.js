//domaimSchema
var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true, trim: true}    
});
module.exports = locationSchema;