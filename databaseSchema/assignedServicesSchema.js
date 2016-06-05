//serverNameSchema
var mongoose = require('mongoose');

var assignedServicesSchema = new mongoose.Schema({
    activeDate: {type: Date},
    location: {type: mongoose.Schema.ObjectId, required: true, ref: "Location"},
    microService: {type: mongoose.Schema.ObjectId, required: true, ref: "MicroService"}
});
module.exports = assignedServicesSchema;