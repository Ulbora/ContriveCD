//serverNameSchema
var mongoose = require('mongoose');

var microServiceSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    desc: {type: String, required: true, trim: true},
    serviceUrl: {type: String, required: true, trim: true}   
});
module.exports = microServiceSchema;