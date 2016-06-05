import {Component, OnInit} from '@angular/core';
import {MenuService}   from '../menu/services/menu-service';
import {Credentials} from '../business/credentials/credentials';
import {LocationListService}   from './services/location-list.service';
import {Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
    selector: 'location-list',
    templateUrl: "../templates/locations.html",

    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        LocationListService
    ]
})

export class LocationListComponent implements OnInit {
    title = 'Locations';

    locationList: Location[];

    constructor(
        private _creds: Credentials,
        private _router: Router,
        private _locationListService: LocationListService,
        private _menuService: MenuService
    ) { };

    ngOnInit() {
        if (!this._creds.checkCreds()) {
            console.log("not logged in");
            this._router.navigate(['Login']);
        } else {
            //console.log("logged in");
            this._menuService.removeClearMenu();
            this._locationListService.getLocationList()
                .subscribe(
                res => this.locationList = res,
                error => this.error(error));
        }
    }

    getTitle() {
        return this.title;
    }

    error(err) {
        console.log("Location list service error: " + err);
    }
}



