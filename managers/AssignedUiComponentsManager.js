var manager = require("./manager");
var db = require("../db/db");

exports.assignUiComponent = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    console.log("security check: " + isOk);
    if (isOk) {
        if (json.uiComponentId && json.locationId) {
            var AssignedUiComponents = db.getAssignedUiComponents();
            AssignedUiComponents.findOne({location: json.locationId, uiComponent: json.uiComponentId}, function (err, results) {
                if (!err && (results === undefined || results === null)) {
                    var assignedJson = {};
                    assignedJson.location = json.locationId;
                    assignedJson.uiComponent = json.uiComponentId;
                    var ser = new AssignedUiComponents(assignedJson);
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
                    console.error("find AssignedUiComponents error: " + err);
                    returnVal.message = "existing AssignedUiComponents";
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


exports.deleteUiComponentsAssignment = function (id, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(id);
    if (isOk) {
        if (id) {
            var AssignedUiComponents = db.getAssignedUiComponents();
            AssignedUiComponents.findById(id, function (err, results) {
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

exports.assignedUiComponentsList = function (json, callback) {
    var filter = {};
    if(json.locationId){
        filter.location = json.locationId;
    }
    if(json.microServiceId){
        filter.uiComponent = json.uiComponentId;
    }
    console.log("filter: " + JSON.stringify(filter));
        
    var AssignedUiComponents = db.getAssignedUiComponents();
    AssignedUiComponents.find(filter, function (err, results) {
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