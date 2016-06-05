import { Component } from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Credentials} from './business/credentials/credentials';
import {MenuComponent}   from './menu/menu.component';
import {MenuService}   from './menu/services/menu-service';
import {LocationListComponent}   from './location/location-list.component';
import {AddLocationComponent}   from './addLocation/add-location.component';
import {EditLocationComponent}   from './editLocation/edit-location.component';
import {DeleteLocationComponent}   from './deleteLocation/delete-location.component';
import {LoginComponent}   from './login/login.component';
import {LogoutComponent}   from './logout/logout.component';
import {MenuComponent}   from './menu/menu.component';
//import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
    selector: 'contrive-app',
    templateUrl: "../templates/main.html",

    directives: [
        ROUTER_DIRECTIVES,
        MenuComponent
    ],
    providers: [
        ROUTER_PROVIDERS,
        Credentials,
        MenuService
    ]


})

@RouteConfig([
    {
        path: '/',
        name: 'Locations',
        component: LocationListComponent
    },
    {
        path: '/addLocation',
        name: 'AddLocation',
        component: AddLocationComponent
    },
    {
        path: '/editLocation/:id',
        name: 'EditLocation',
        component: EditLocationComponent
    },
    {
        path: '/deleteLocation/:id',
        name: 'DeleteLocation',
        component: DeleteLocationComponent
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent
    },
    {
        path: '/logout',
        name: 'Logout',
        component: LogoutComponent
    }
])

export class AppComponent {
    title = 'ContriveCD';
    constructor(
        private _menuService: MenuService,
        private _creds: Credentials
    ) { };
    getTitle() {
        return this.title;
    }
}



