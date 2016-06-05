import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Location}           from '../../domainObjects/location';
import {ServiceResponse}           from '../../domainObjects/service-response';
import {Credentials} from '../../business/credentials/credentials';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class EditLocationService {
    constructor(private http: Http) { }

    private locationUrl = './rs/location';  // URL to web api
    
    getLocation(id: string): Observable<Domain> {
        let getUrl = this.locationUrl + ("/" + id);
        let creds = new Credentials();        
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + creds.getToken());
        let options = new RequestOptions({ headers: headers });

        return this.http.get(getUrl, options)
            .do(res => console.log("Response: " + JSON.stringify(res.json()))) // eyeball results in the console
            .map(res => <Location>res.json())
            .catch(this.handleError)
    }
    
    updateLocation(json): Observable<ServiceResponse> {        
        let creds = new Credentials();        
        let body = JSON.stringify(json);        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');  
        headers.append('Authorization', 'Basic ' + creds.getToken());
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.loctionUrl, body, options)
            .do(res => console.log("Response: " + JSON.stringify(res.json()))) // eyeball results in the console
            .map(res => <ServiceResponse>res.json())
            .catch(this.handleError)
    }
    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}