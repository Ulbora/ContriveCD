System.register(['@angular/core', '../business/credentials/credentials', '../menu/services/menu-service', './services/delete-location.service', '@angular/router-deprecated'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, credentials_1, menu_service_1, delete_location_service_1, router_deprecated_1;
    var DeleteLocationComponent;
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
            function (delete_location_service_1_1) {
                delete_location_service_1 = delete_location_service_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            }],
        execute: function() {
            DeleteLocationComponent = (function () {
                function DeleteLocationComponent(_creds, _router, _deleteLocationService, _routeParams, _menuService) {
                    this._creds = _creds;
                    this._router = _router;
                    this._deleteLocationService = _deleteLocationService;
                    this._routeParams = _routeParams;
                    this._menuService = _menuService;
                    this.title = 'Delete Location';
                }
                ;
                DeleteLocationComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this._creds.checkCreds()) {
                        console.log("not logged in");
                        this._router.navigate(['Login']);
                    }
                    else {
                        this._menuService.setClearMenu();
                        var id = this._routeParams.get('id');
                        this._deleteLocationService.getLocation(id)
                            .subscribe(function (res) { return _this.success(res); }, function (error) { return _this.error(error); });
                    }
                };
                DeleteLocationComponent.prototype.getTitle = function () {
                    return this.title;
                };
                DeleteLocationComponent.prototype.success = function (res) {
                    this.location = res;
                    this.id = res._id;
                    this.name = this.location.name;
                    console.log("Res in delete-domain: " + JSON.stringify(this.location));
                };
                DeleteLocationComponent.prototype.error = function (err) {
                    console.log("Delete location service error: " + err);
                };
                DeleteLocationComponent.prototype.onDeleteClicked = function () {
                    console.log("Delete location");
                };
                DeleteLocationComponent.prototype.onCancelClicked = function () {
                    console.log("Cancel Delete");
                };
                DeleteLocationComponent = __decorate([
                    core_1.Component({
                        selector: 'delete-location',
                        templateUrl: "../templates/deleteLocation.html",
                        directives: [
                            router_deprecated_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            delete_location_service_1.DeleteLocationService
                        ]
                    }), 
                    __metadata('design:paramtypes', [credentials_1.Credentials, router_deprecated_1.Router, delete_location_service_1.DeleteLocationService, router_deprecated_1.RouteParams, menu_service_1.MenuService])
                ], DeleteLocationComponent);
                return DeleteLocationComponent;
            })();
            exports_1("DeleteLocationComponent", DeleteLocationComponent);
        }
    }
});
//# sourceMappingURL=delete-location.component.js.map