System.register(['@angular/core', '@angular/router-deprecated', '../business/credentials/credentials'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_deprecated_1, credentials_1;
    var LogoutComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (credentials_1_1) {
                credentials_1 = credentials_1_1;
            }],
        execute: function() {
            LogoutComponent = (function () {
                function LogoutComponent(_creds, _router) {
                    this._creds = _creds;
                    this._router = _router;
                    this.title = 'Logout';
                }
                ;
                LogoutComponent.prototype.ngOnInit = function () {
                    this._creds.deleteCreds();
                    this._router.navigate(['Login']);
                };
                LogoutComponent.prototype.getTitle = function () {
                    return this.title;
                };
                LogoutComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        template: "",
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [credentials_1.Credentials, router_deprecated_1.Router])
                ], LogoutComponent);
                return LogoutComponent;
            })();
            exports_1("LogoutComponent", LogoutComponent);
        }
    }
});
//# sourceMappingURL=logout.component.js.map