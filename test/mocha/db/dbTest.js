var assert = require('assert');
var db = require("../../../db/db");
describe('DB', function () {
    describe('#getLocations()', function () {
        it('should add and remove a Location', function (done) {
              var l = {};
            l.name = "east"
            var Location = db.getLocation();
            var loc = new Location(l);  
            
            loc.save(function (err) {
                if (err) {                    
                    console.log("save error: " + err);
                    assert(false);
                } else {                    
                    console.log("save success: ");   
                    assert(true);                
                }
            });
            Location.findOne({name: "east"}, null, {}, function (err, results) {
                if (err) {
                    console.log("find error: " + err);
                    assert(false);
                } else {
                    results.remove(function (err) {
                        if (err) {
                            console.log("delete error: " + err);
                            assert(false);
                        } else {
                            console.log("delete success: ");
                            assert(true);
                            done();
                        }
                    });
                }
            });
           
        });
    });
});

