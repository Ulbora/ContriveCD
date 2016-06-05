//mongoDB files
var conf = require('../configuration');
var mongoose = require('mongoose');
//var mongoConnectString = "mongodb://localhost/ulboracms";
var mongoConnectString = "mongodb://";//localhost/ulboracms";
//this is specific to RedHat's OpenShift 
if (process.env.DOCKER_MONGODB_NAME && process.env.DOCKER_MONGODB_USERNAME) {
    mongoConnectString += (process.env.DOCKER_MONGODB_USERNAME + ":" +
            process.env.DOCKER_MONGODB_PASSWORD + "@" +
            process.env.DOCKER_MONGODB_HOST + ':' +
            process.env.DOCKER_MONGODB_PORT + '/' +
            process.env.DOCKER_MONGODB_NAME);
    //this is specific to a Docker self contained containers
} else if (process.env.MONGO_PORT_27017_TCP_ADDR) {
    //this is the default database
    mongoConnectString += (process.env.MONGO_PORT_27017_TCP_ADDR + "/" + process.env.DOCKER_DATABASE_NAME);
} else {
    //this is the default database
    mongoConnectString += (conf.HOST + "/" + conf.DATABASE_NAME);
}

//mongoose.connect('mongodb://localhost/blogpost');
mongoose.connect(mongoConnectString);

var manager = require('../managers/manager');


var locationSchema = require('../databaseSchema/locationSchema');
var microServiceSchema = require('../databaseSchema/microServiceSchema');
var uiComponentSchema = require('../databaseSchema/uiComponentSchema');
var userSchema = require('../databaseSchema/userSchema');

var Location = mongoose.model('Location', locationSchema);
var MicroService = mongoose.model('MicroService', microServiceSchema);
var UiComponent = mongoose.model('UiComponent', uiComponentSchema);
var User = mongoose.model('User', userSchema);

exports.getLocation = function () {
    return Location;
};
exports.getMicroService = function () {
    return MicroService;
};
exports.getUiComponent = function () {
    return UiComponent;
};
exports.getUser = function () {
    return User;
};

//initialize the mongoDB database with needed records required for startup
exports.initializeMongoDb = function () {    
    initializeDefaultUsers();
};



initializeDefaultUsers = function () {
    User.find({}, function (err, results) {
        if (err) {
            console.error("user Error:" + err);
        } else {
            console.log("user:" + JSON.stringify(results));
            if (results.length === 0) {
                var hashedPw = manager.hashPasswordSync("admin", "admin");
                var adminUserRecord = {
                    username: "admin",
                    password: hashedPw,
                    firstName: "super",
                    lastName: "administrator"
                };
                var u = new User(adminUserRecord);
                u.save(function (err) {
                    if (err) {
                        console.error("super admin user save error: " + err);
                    } 
                });
            }
        }
    });
};
