//serverNameSchema
var mongoose = require('mongoose');

var uiComponentSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},   
    activeDate: {type: Date},
    location: {type: mongoose.Schema.ObjectId, required: true, ref: "Location"}
});
module.exports = uiComponentSchema;