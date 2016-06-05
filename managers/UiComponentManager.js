var manager = require("./manager");
var db = require("../db/db");

exports.addUiComponent = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    console.log("security check: " + isOk);
    if (isOk) {
        if (json.name && json.desc) {
            var UiComponent = db.getUiComponent();
            UiComponent.findOne({name: json.name}, function (err, results) {
                if (!err && (results === undefined || results === null)) {
                    var com = new UiComponent(json);
                    com.save(function (saveErr) {
                        if (saveErr) {
                            returnVal.message = "save failed";
                            console.error("save error: " + saveErr);
                        } else {
                            returnVal.success = true;
                        }
                        callback(returnVal);
                    });
                } else {
                    console.error("find UiComponent error: " + err);
                    returnVal.message = "existing UiComponent";
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

exports.updateUiComponent = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    console.log("security check: " + isOk);
    if (isOk) {
        if (json.id && json.name && json.desc) {
            var UiComponent = db.getUiComponent();
            UiComponent.findById(json.id, function (err, results) {
                if (!err && results) {
                    results.name = json.name;
                    results.desc = json.desc;                    
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
                    console.error("UiComponent update error: " + err);
                    returnVal.message = "error updating UiComponent";
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

exports.getUiComponent = function (id, callback) {
    var isOk = manager.securityCheck(id);
    if (isOk) {
        if (id) {
            var UiComponent = db.getUiComponent();
            UiComponent.findById(id, function (err, results) {
                if (!err && results) {
                    callback(results);
                } else {
                    console.error("UiComponent find error: " + err);
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

exports.deleteUiComponent = function (id, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(id);
    if (isOk) {
        if (id) {
            var UiComponent = db.getUiComponent();
            UiComponent.findById(id, function (err, results) {
                if (!err && results) {
                    results.remove();
                    returnVal.success = true;
                    callback(returnVal);
                } else {
                    console.error("UiComponent find error: " + err);
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

exports.uiComponentList = function (callback) {
    var UiComponent = db.getUiComponent();
    UiComponent.find({}, function (err, results) {
        if (!err && results) {
            callback(results);
        } else if (err) {
            console.error("find UiComponent error: " + err);
            callback([]);
        } else {
            callback([]);
        }
    });
};