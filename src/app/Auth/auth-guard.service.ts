import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Auth } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: Auth, private router: Router) {}

    canActivate() {
        if(this.auth.isAdmin()) {
            return true;
        } else {
            console.log("Duhhh Your Not Admin");
            return false;
        }
    }
}