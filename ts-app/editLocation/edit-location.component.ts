import {Component, OnInit} from '@angular/core';
import {Credentials} from '../business/credentials/credentials';
import {MenuService}   from '../menu/services/menu-service';
import {EditLocationService}   from './services/edit-location.service';
import {Router, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';

@Component({
    selector: 'edit-location',
    templateUrl: "../templates/editLocation.html",

    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [        
        EditLocationService
    ]
})


export class EditLocationComponent implements OnInit {
    title = 'Edit Location';

    location: Location;

    submitted = false;
    active = false;
    errorMessage: string

    constructor(
        private _creds: Credentials,
        private _router: Router,
        private _editLocationService: EditLocationService,
        private _routeParams: RouteParams,
        private _menuService: MenuService        
    ) { };

    ngOnInit() {
        if (!this._creds.checkCreds()) {
            console.log("not logged in");
            this._router.navigate(['Login']);
        } else {            
            this._menuService.setClearMenu();
            let id = this._routeParams.get('id');
            this._editLocationService.getLocation(id)
                .subscribe(
                res => this.success(res),
                error => this.error(error));
        }
    }

    getTitle() {
        return this.title;
    }

    success(res) {
        this.location = res
        
        this.location.id = res._id;
        delete this.location._id;
        
        this.active = true;
        console.log("Res in edit-location: " + JSON.stringify(this.location));
    }
    error(err) {
        console.log("Edit Location service error: " + err);
    }

    onSubmit() {
        console.log("Res in edit-location submit: " + JSON.stringify(this.location));
        this.processSubmittedData();
    }

    processSubmittedData() {
        if (!this.submitted) {
            console.log("Res in edit-location submit: " + JSON.stringify(this.location));
            this._editLocationService.updateLocation(this.location)
                .subscribe(
                res => this.submitSuccess(res),
                error => this.error(error));
        }

    }

    submitSuccess(res) {
        if (res.success) {
            this.submitted = true;
            this.errorMessage = "";
            this._router.navigate(['Locations']);
        } else {
            this.errorMessage = "Update Failed";
        }
    }
}



