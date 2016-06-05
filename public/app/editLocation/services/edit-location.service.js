System.register(['@angular/core', '@angular/http', '../../business/credentials/credentials', 'rxjs/Observable', 'rxjs/add/operator/do', 'rxjs/add/operator/map', 'rxjs/add/operator/catch'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, http_2, credentials_1, Observable_1;
    var EditLocationService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (credentials_1_1) {
                credentials_1 = credentials_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {}],
        execute: function() {
            EditLocationService = (function () {
                function EditLocationService(http) {
                    this.http = http;
                    this.locationUrl = './rs/location';
                }
                EditLocationService.prototype.getLocation = function (id) {
                    var getUrl = this.locationUrl + ("/" + id);
                    var creds = new credentials_1.Credentials();
                    var headers = new http_2.Headers();
                    headers.append('Authorization', 'Basic ' + creds.getToken());
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.get(getUrl, options)
                        .do(function (res) { return console.log("Response: " + JSON.stringify(res.json())); })
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                EditLocationService.prototype.updateLocation = function (json) {
                    var creds = new credentials_1.Credentials();
                    var body = JSON.stringify(json);
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('Authorization', 'Basic ' + creds.getToken());
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.put(this.loctionUrl, body, options)
                        .do(function (res) { return console.log("Response: " + JSON.stringify(res.json())); })
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                EditLocationService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                EditLocationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], EditLocationService);
                return EditLocationService;
            })();
            exports_1("EditLocationService", EditLocationService);
        }
    }
});
//# sourceMappingURL=edit-location.service.js.map