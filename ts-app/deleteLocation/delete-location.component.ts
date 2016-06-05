import {Component, OnInit} from '@angular/core';
import {Credentials} from '../business/credentials/credentials';
import {MenuService}   from '../menu/services/menu-service';
import {DeleteLocationService}   from './services/delete-location.service';
import {Router, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';

@Component({
    selector: 'delete-location',
    templateUrl: "../templates/deleteLocation.html",

    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [        
        DeleteLocationService
    ]
})


export class DeleteLocationComponent implements OnInit {
    title = 'Delete Location';

    location: Location;
    id: string;
    name: string;


    errorMessage: string

    constructor(
        private _creds: Credentials,
        private _router: Router,
        private _deleteLocationService: DeleteLocationService,
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
            this._deleteLocationService.getLocation(id)
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
        this.id = res._id;        
        this.name = this.location.name;
        
        console.log("Res in delete-domain: " + JSON.stringify(this.location));
    }
    error(err) {
        console.log("Delete location service error: " + err);
    }
    
    
    onDeleteClicked(){
        console.log("Delete location");
    }
    
    onCancelClicked(){
        console.log("Cancel Delete");
    }


}



