import {Http,RequestOptions} from "@angular/http";
import {NgModule} from "@angular/core";
import {AuthConfig, AuthHttp} from "angular2-jwt";
export function authHttpServiceFactory(http:Http, options:RequestOptions){
    return new AuthHttp(new AuthConfig({
        headerName : 'Authorization',
        headerPrefix : 'JWT',
        tokenName: 'token',
        tokenGetter: (()=> localStorage.getItem('token')),
        globalHeaders: [{'Content-Type':'application/json'}]
       // noJwtError: true,
       // noTokenScheme: true,
    }),http,options);
}

@NgModule({
    providers : [{
        provide: AuthHttp,
        useFactory: authHttpServiceFactory,
        deps: [Http, RequestOptions]
    }]
})
export class AuthModule{}
