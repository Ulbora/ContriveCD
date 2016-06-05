import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Location}           from '../../domainObjects/location';
import {Credentials} from '../../business/credentials/credentials';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class LocationListService {
    constructor(private http: Http) { }

    private locationUrl = './rs/location/list';  // URL to web api
    //let AUTH = "";
    getLocationList(): Observable<Location[]> {
        let creds = new Credentials();
        let body = JSON.stringify("{}");
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + creds.getToken());
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.locationUrl, body, options)
            .do(res => console.log("Response: " + JSON.stringify(res.json()))) // eyeball results in the console
            .map(res => <Location>res.json())
            .catch(this.handleError)
    }
    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}