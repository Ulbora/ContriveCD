import {Injectable}     from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import {Cookie} from '../../utilities/cookies';

@Injectable()
export class Credentials {
    
   checkCreds(): boolean{
       var rtn = false;
       var creds = Cookie.getCookie("contriveCD");
       if(creds){
           rtn = true;
       }
       return rtn;
   }
   
   getToken():string{
       var token = Cookie.getCookie("contriveCD");
       return token;
   }
   setCreds(un:string, pw:string){
       var temp = un.concat(":", pw);
       var token = btoa(temp);
       Cookie.setCookie("contriveCD", token);
       Cookie.setCookie("contriveCdUsername", un);
   }
   getUsername():string{
       var un = Cookie.getCookie("contriveCdUsername");
       return un;
   }
   deleteCreds(){
       Cookie.deleteCookie("contriveCD");
       Cookie.deleteCookie("contriveCdUsername");
   }
}