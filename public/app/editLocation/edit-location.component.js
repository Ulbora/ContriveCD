System.register(['@angular/core', '../business/credentials/credentials', '../menu/services/menu-service', './services/edit-location.service', '@angular/router-deprecated'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, credentials_1, menu_service_1, edit_location_service_1, router_deprecated_1;
    var EditLocationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (credentials_1_1) {
                credentials_1 = credentials_1_1;
            },
            function (menu_service_1_1) {
                menu_service_1 = menu_service_1_1;
            },
            function (edit_location_service_1_1) {
                edit_location_service_1 = edit_location_service_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            }],
        execute: function() {
            EditLocationComponent = (function () {
                function EditLocationComponent(_creds, _router, _editLocationService, _routeParams, _menuService) {
                    this._creds = _creds;
                    this._router = _router;
                    this._editLocationService = _editLocationService;
                    this._routeParams = _routeParams;
                    this._menuService = _menuService;
                    this.title = 'Edit Location';
                    this.submitted = false;
                    this.active = false;
                }
                ;
                EditLocationComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this._creds.checkCreds()) {
                        console.log("not logged in");
                        this._router.navigate(['Login']);
                    }
                    else {
                        this._menuService.setClearMenu();
                        var id = this._routeParams.get('id');
                        this._editLocationService.getLocation(id)
                            .subscribe(function (res) { return _this.success(res); }, function (error) { return _this.error(error); });
                    }
                };
                EditLocationComponent.prototype.getTitle = function () {
                    return this.title;
                };
                EditLocationComponent.prototype.success = function (res) {
                    this.location = res;
                    this.location.id = res._id;
                    delete this.location._id;
                    this.active = true;
                    console.log("Res in edit-location: " + JSON.stringify(this.location));
                };
                EditLocationComponent.prototype.error = function (err) {
                    console.log("Edit Location service error: " + err);
                };
                EditLocationComponent.prototype.onSubmit = function () {
                    console.log("Res in edit-location submit: " + JSON.stringify(this.location));
                    this.processSubmittedData();
                };
                EditLocationComponent.prototype.processSubmittedData = function () {
                    var _this = this;
                    if (!this.submitted) {
                        console.log("Res in edit-location submit: " + JSON.stringify(this.location));
                        this._editLocationService.updateLocation(this.location)
                            .subscribe(function (res) { return _this.submitSuccess(res); }, function (error) { return _this.error(error); });
                    }
                };
                EditLocationComponent.prototype.submitSuccess = function (res) {
                    if (res.success) {
                        this.submitted = true;
                        this.errorMessage = "";
                        this._router.navigate(['Locations']);
                    }
                    else {
                        this.errorMessage = "Update Failed";
                    }
                };
                EditLocationComponent = __decorate([
                    core_1.Component({
                        selector: 'edit-location',
                        templateUrl: "../templates/editLocation.html",
                        directives: [
                            router_deprecated_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            edit_location_service_1.EditLocationService
                        ]
                    }), 
                    __metadata('design:paramtypes', [credentials_1.Credentials, router_deprecated_1.Router, edit_location_service_1.EditLocationService, router_deprecated_1.RouteParams, menu_service_1.MenuService])
                ], EditLocationComponent);
                return EditLocationComponent;
            })();
            exports_1("EditLocationComponent", EditLocationComponent);
        }
    }
});
//# sourceMappingURL=edit-location.component.js.map