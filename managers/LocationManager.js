var manager = require("./manager");
var db = require("../db/db");

exports.addLocation = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    console.log("security check: " + isOk);
    if (isOk) {
        if (json.name) {
            var Location = db.getLocation();
            Location.findOne({name: json.name}, function (err, results) {
                if (!err && (results === undefined || results === null)) {
                    var locObj = {};
                    locObj.name = json.name;
                    var loc = new Location(locObj);
                    loc.save(function (saveErr) {
                        if (saveErr) {
                            returnVal.message = "save failed";
                            console.error("save error: " + saveErr);
                        } else {
                            returnVal.success = true;
                        }
                        callback(returnVal);
                    });
                } else {
                    console.error("find location error: " + err);
                    returnVal.message = "existing location";
                    callback(returnVal);
                }
            });
        } else {
            callback(returnVal);
        }
    } else {
        callback(returnVal);
    }
};

exports.updateLocation = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    console.log("security check: " + isOk);
    if (isOk) {
        if (json.id && json.name) {
            var Location = db.getLocation();
            Location.findById(json.id, function (err, results) {
                if (!err && results) {
                    results.name = json.name;
                    results.save(function (saveErr) {
                        if (saveErr) {
                            returnVal.message = "save failed";
                            console.error("save error: " + saveErr);
                        } else {
                            returnVal.success = true;
                        }
                        callback(returnVal);
                    });
                } else {
                    console.error("location update error: " + err);
                    returnVal.message = "error updating location";
                    callback(returnVal);
                }
            });
        } else {
            callback(returnVal);
        }
    } else {
        callback(returnVal);
    }
};

exports.getLocation = function (id, callback) {
    var isOk = manager.securityCheck(id);
    if (isOk) {
        if (id) {
            var Location = db.getLocation();
            Location.findById(id, function (err, results) {
                if (!err && results) {
                    callback(results);
                } else {
                    console.error("location find error: " + err);
                    callback({});
                }
            });
        } else {
            callback({});
        }
    } else {
        callback({});
    }
};

exports.deleteDomain = function (id, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(id);
    if (isOk) {
        if (id) {
            var Location = db.getLocation();
            Location.findById(id, function (err, results) {
                if (!err && results) {
                    results.remove();
                    returnVal.success = true;
                    callback(returnVal);
                } else {
                    console.error("location find error: " + err);
                    callback(returnVal);
                }
            });
        } else {
            callback(returnVal);
        }
    } else {
        callback(returnVal);
    }
};

exports.locationList = function (callback) {
    var Location = db.getLocation();
    Location.find({}, function (err, results) {
        if (!err && results) {
             callback(results);
         }else if(err){
             console.error("find location error: " + err);
             callback([]);
         }else{
             callback([]);
         }
    });
};