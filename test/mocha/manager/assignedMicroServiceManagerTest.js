var assert = require('assert');
var db = require("../../../db/db");
var AssignedMicroServicesManager = require("../../../managers/AssignedMicroServicesManager");
var MicroServiceManager = require("../../../managers/MicroServiceManager");
var locationManager = require("../../../managers/LocationManager");
var btoa = require('btoa')
describe('AssignedMicroServicesManager', function () {
    //do add here
    var msName = "sales3";
    var msId;
    var locName = "westtest3";
    var locId;

    describe('#addAssignedMicroServices()', function () {
        it('should add, get, update, and delete a AssignedMicroServices', function (done) {
            var ms = {}
            ms.name = msName;
            ms.desc = "test service";
            ms.serviceUrl = "http://www.google.com";
            MicroServiceManager.addMicroService(ms, function (msresults) {
                if (msresults.success) {
                    var MicroService = db.getMicroService();
                    MicroService.findOne({name: msName}, function (err, sresults) {
                        msId = sresults._id;
                        var loc = {}
                        loc.name = locName;
                        locationManager.addLocation(loc, function (llresults) {
                            if (llresults.success) {
                                var Location = db.getLocation();
                                Location.findOne({name: locName}, function (err, lresults) {
                                    locId = lresults._id;
                                    var assign = {};
                                    assign.locationId = locId;
                                    assign.microServiceId = msId;
                                    AssignedMicroServicesManager.assignMicroService(assign, function (aResults) {
                                        if (aResults.success) {
                                            AssignedMicroServicesManager.assignedMicroServiceList(assign, function (assignedList) {
                                                if (assignedList.length > 0) {
                                                    var tempId = assignedList[0]._id;
                                                    AssignedMicroServicesManager.deleteMicroServiceAssignment(tempId, function (delRes) {
                                                        if (delRes.success) {
                                                            locationManager.deleteLocation(locId, function(r){});
                                                            MicroServiceManager.deleteMicroService(msId, function(r){});
                                                            assert(true);
                                                            done()
                                                        } else {
                                                            assert(false);
                                                        }
                                                    });
                                                } else {
                                                    assert(false);
                                                }
                                            });
                                        } else {
                                            assert(false);
                                        }
                                    });
                                });
                            } else {
                                assert(false);
                            }
                        });
                    });
                } else {
                    assert(false);
                }
            });
        });
    });

});

