var assert = require('assert');
var db = require("../../../db/db");
var AssignedUiComponentsManager = require("../../../managers/AssignedUiComponentsManager");
var UiComponentManager = require("../../../managers/UiComponentManager");
var locationManager = require("../../../managers/LocationManager");
var btoa = require('btoa')
describe('AssignedUiComponentsManager', function () {
    //do add here
    var msName = "sales3";
    var msId;
    var locName = "westtest4";
    var locId;

    describe('#AssignedUiComponentsManager()', function () {
        it('should add, get, update, and delete a AssignedUiComponentsManager', function (done) {
            var ms = {}
            ms.name = msName;
            ms.desc = "test service";            
            UiComponentManager.addUiComponent(ms, function (msresults) {
                if (msresults.success) {
                    var UiComponent = db.getUiComponent();
                    UiComponent.findOne({name: msName}, function (err, sresults) {
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
                                    assign.uiComponentId = msId;
                                    AssignedUiComponentsManager.assignUiComponent(assign, function (aResults) {
                                        if (aResults.success) {
                                            AssignedUiComponentsManager.assignedUiComponentsList(assign, function (assignedList) {
                                                if (assignedList.length > 0) {
                                                    var tempId = assignedList[0]._id;
                                                    AssignedUiComponentsManager.deleteUiComponentsAssignment(tempId, function (delRes) {
                                                        if (delRes.success) {
                                                            locationManager.deleteLocation(locId, function(r){});
                                                            UiComponentManager.deleteUiComponent(msId, function(r){});
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

