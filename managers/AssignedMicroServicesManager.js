var manager = require("./manager");
var db = require("../db/db");

exports.assignMicroService = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    console.log("security check: " + isOk);
    if (isOk) {
        if (json.microServiceId && json.locationId) {
            var AssignedMicroServices = db.getAssignedMicroServices();
            AssignedMicroServices.findOne({location: json.locationId, microService: json.microServiceId}, function (err, results) {
                if (!err && (results === undefined || results === null)) {
                    var assignedJson = {};
                    assignedJson.location = json.locationId;
                    assignedJson.microService = json.microServiceId;
                    var ser = new AssignedMicroServices(assignedJson);
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
                    console.error("find AssignedMicroServices error: " + err);
                    returnVal.message = "existing AssignedMicroServices";
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


exports.deleteMicroServiceAssignment = function (id, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(id);
    if (isOk) {
        if (id) {
            var AssignedMicroServices = db.getAssignedMicroServices();
            AssignedMicroServices.findById(id, function (err, results) {
                if (!err && results) {
                    results.remove();
                    returnVal.success = true;
                    callback(returnVal);
                } else {
                    console.error("AssignedMicroServices find error: " + err);
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

exports.assignedMicroServiceList = function (json, callback) {
    var filter = {};
    if(json.locationId){
        filter.location = json.locationId;
    }
    if(json.microServiceId){
        filter.microService = json.microServiceId;
    }
    console.log("filter: " + JSON.stringify(filter));
        
    var AssignedMicroServices = db.getAssignedMicroServices();
    AssignedMicroServices.find(filter, function (err, results) {
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