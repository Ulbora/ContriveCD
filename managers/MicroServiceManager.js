var manager = require("./manager");
var db = require("../db/db");

exports.addMicroService = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    console.log("security check: " + isOk);
    if (isOk) {
        if (json.name && json.desc && json.serviceUrl) {
            var MicroService = db.getMicroService();
            MicroService.findOne({name: json.name}, function (err, results) {
                if (!err && (results === undefined || results === null)) {
                    var ser = new MicroService(json);
                    ser.save(function (saveErr) {
                        if (saveErr) {
                            returnVal.message = "save failed";
                            console.error("save error: " + saveErr);
                        } else {
                            returnVal.success = true;
                        }
                        callback(returnVal);
                    });
                } else {
                    console.error("find microservice error: " + err);
                    returnVal.message = "existing microservice";
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

exports.updateMicroService = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    console.log("security check: " + isOk);
    if (isOk) {
        if (json.id && json.name && json.desc && json.serviceUrl) {
            var MicroService = db.getMicroService();
            MicroService.findById(json.id, function (err, results) {
                if (!err && results) {
                    results.name = json.name;
                    results.desc = json.desc;
                    results.serviceUrl = json.serviceUrl;
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
                    console.error("microservice update error: " + err);
                    returnVal.message = "error updating microservice";
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

exports.getMicroService = function (id, callback) {
    var isOk = manager.securityCheck(id);
    if (isOk) {
        if (id) {
            var MicroService = db.getMicroService();
            MicroService.findById(id, function (err, results) {
                if (!err && results) {
                    callback(results);
                } else {
                    console.error("MicroService find error: " + err);
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

exports.deleteMicroService = function (id, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(id);
    if (isOk) {
        if (id) {
            var MicroService = db.getMicroService();
            MicroService.findById(id, function (err, results) {
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

exports.microServiceList = function (callback) {
    var MicroService = db.getMicroService();
    MicroService.find({}, function (err, results) {
        if (!err && results) {
            callback(results);
        } else if (err) {
            console.error("find location error: " + err);
            callback([]);
        } else {
            callback([]);
        }
    });
};