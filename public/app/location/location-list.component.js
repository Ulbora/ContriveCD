System.register(['@angular/core', '../menu/services/menu-service', '../business/credentials/credentials', './services/location-list.service', '@angular/router-deprecated'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, menu_service_1, credentials_1, location_list_service_1, router_deprecated_1;
    var LocationListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (menu_service_1_1) {
                menu_service_1 = menu_service_1_1;
            },
            function (credentials_1_1) {
                credentials_1 = credentials_1_1;
            },
            function (location_list_service_1_1) {
                location_list_service_1 = location_list_service_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            }],
        execute: function() {
            LocationListComponent = (function () {
                function LocationListComponent(_creds, _router, _locationListService, _menuService) {
                    this._creds = _creds;
                    this._router = _router;
                    this._locationListService = _locationListService;
                    this._menuService = _menuService;
                    this.title = 'Locations';
                }
                ;
                LocationListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this._creds.checkCreds()) {
                        console.log("not logged in");
                        this._router.navigate(['Login']);
                    }
                    else {
                        this._menuService.removeClearMenu();
                        this._locationListService.getLocationList()
                            .subscribe(function (res) { return _this.locationList = res; }, function (error) { return _this.error(error); });
                    }
                };
                LocationListComponent.prototype.getTitle = function () {
                    return this.title;
                };
                LocationListComponent.prototype.error = function (err) {
                    console.log("Location list service error: " + err);
                };
                LocationListComponent = __decorate([
                    core_1.Component({
                        selector: 'location-list',
                        templateUrl: "../templates/locations.html",
                        directives: [
                            router_deprecated_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            location_list_service_1.LocationListService
                        ]
                    }), 
                    __metadata('design:paramtypes', [credentials_1.Credentials, router_deprecated_1.Router, location_list_service_1.LocationListService, menu_service_1.MenuService])
                ], LocationListComponent);
                return LocationListComponent;
            })();
            exports_1("LocationListComponent", LocationListComponent);
        }
    }
});
//# sourceMappingURL=location-list.component.js.map