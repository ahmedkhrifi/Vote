import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiServiceService } from './api-service.service';

import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';




@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: ApiServiceService, private cookieService: CookieService,
    private myRoute: Router) {
  }
  getDecodedAccessToken(token: string): any {
    try {
        return jwt_decode(token);
    } catch (Error) {
        return null;
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const  role = this.getDecodedAccessToken(this.cookieService.get('token')).data.role;

      if (role === 'user') {
       this.myRoute.navigate(['home']);
          return true;
      } else {
        console.log(role);
        this.myRoute.navigate(['admin']);
        return false;
      }

  }
}
