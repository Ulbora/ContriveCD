var assert = require('assert');
var db = require("../../../db/db");
var UiComponentManager = require("../../../managers/UiComponentManager");
var btoa = require('btoa')
describe('UiComponentManager', function () {
    //do add here
    var msName = "sales";
    var msId;

    describe('#addUiComponent()', function () {
        it('should add, get, update, and delete a UiComponent', function (done) {
            var ms = {}
            ms.name = msName;
            ms.desc = "test service";            
            UiComponentManager.addUiComponent(ms, function (results) {
                if (results.success) {
                    var UiComponent = db.getUiComponent();
                    UiComponent.findOne({name: msName}, function (err, results) {
                        msId = results._id;
                        ms.name = "marketing component";
                        ms.desc = "test component";                        
                        ms.id = msId;
                        UiComponentManager.updateUiComponent(ms, function (updateResult) {
                            if (updateResult.success) {
                                UiComponentManager.uiComponentList(function (listResults) {
                                    if (listResults.length > 0) {
                                        UiComponentManager.getUiComponent(msId, function (msResults) {
                                            if (msResults && msResults.name === "marketing component") {
                                                UiComponentManager.deleteUiComponent(msId, function (delResults) {
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

