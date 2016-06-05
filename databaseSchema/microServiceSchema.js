//serverNameSchema
var mongoose = require('mongoose');

var microServiceSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    serviceUrl: {type: String, required: true, trim: true},
    activeDate: {type: Date},
    location: {type: mongoose.Schema.ObjectId, required: true, ref: "Location"}
});
module.exports = microServiceSchema;