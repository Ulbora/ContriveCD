//serverNameSchema
var mongoose = require('mongoose');

var assignedUiComponentsSchema = new mongoose.Schema({
    activeDate: {type: Date},
    location: {type: mongoose.Schema.ObjectId, required: true, ref: "Location"},
    uiComponent: {type: mongoose.Schema.ObjectId, required: true, ref: "UiComponent"}
});
module.exports = assignedUiComponentsSchema;