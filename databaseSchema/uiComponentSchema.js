//serverNameSchema
var mongoose = require('mongoose');

var uiComponentSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    desc: {type: String, required: true, trim: true}
});
module.exports = uiComponentSchema;