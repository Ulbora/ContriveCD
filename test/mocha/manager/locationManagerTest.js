var assert = require('assert');
var db = require("../../../db/db");
var locationManager = require("../../../managers/LocationManager");
var btoa = require('btoa')
describe('LocationManager', function () {
    //do add here
    var locName = "westtest";
    var locId;

    describe('#addLocation()', function () {
        it('should add, get, update, and delete a domain', function (done) {
            var loc = {}
            loc.name = locName;
            locationManager.addLocation(loc, function (results) {
                if (results.success) {
                    var Location = db.getLocation();
                    Location.findOne({name: locName}, function (err, results) {
                        locId = results._id;
                        loc.name = "eastTest";
                        loc.id = locId;
                        locationManager.updateLocation(loc, function (updateResult) {
                            if (updateResult.success) {
                                locationManager.locationList(function (listResults) {
                                    if (listResults.length > 0) {
                                        locationManager.getLocation(locId, function (locResults) {
                                            if (locResults && locResults.name === "eastTest") {
                                                locationManager.deleteDomain(locId, function (delResults) {
                                                    if (delResults.success) {
                                                        assert(true);
                                                        done();
                                                    } else {
                                                        assert(false);
                                                    }
                                                })
                                            } else {
                                                assert(false);
                                            }
                                        })
                                    } else {
                                        assert(false);
                                    }
                                });
                            } else {
                                assert(false);
                            }
                        })
                    });
                } else {
                    assert(false);
                }                
            })
        });
    });

});

