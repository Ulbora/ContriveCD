var assert = require('assert');
var db = require("../../../db/db");
var MicroServiceManager = require("../../../managers/MicroServiceManager");
var btoa = require('btoa')
describe('MicroServiceManager', function () {
    //do add here
    var msName = "sales";
    var msId;

    describe('#addMicroService()', function () {
        it('should add, get, update, and delete a MicroService', function (done) {
            var ms = {}
            ms.name = msName;
            ms.desc = "test service";
            ms.serviceUrl = "http://www.google.com";
            MicroServiceManager.addMicroService(ms, function (results) {
                if (results.success) {
                    var MicroService = db.getMicroService();
                    MicroService.findOne({name: msName}, function (err, results) {
                        msId = results._id;
                        ms.name = "marketing";
                        ms.desc = "test service 2";
                        ms.serviceUrl = "http://yahoo.com";
                        ms.id = msId;
                        MicroServiceManager.updateMicroService(ms, function (updateResult) {
                            if (updateResult.success) {
                                MicroServiceManager.microServiceList(function (listResults) {
                                    if (listResults.length > 0) {
                                        MicroServiceManager.getMicroService(msId, function (msResults) {
                                            if (msResults && msResults.name === "marketing") {
                                                MicroServiceManager.deleteMicroService(msId, function (delResults) {
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

