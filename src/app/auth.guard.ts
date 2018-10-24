import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiServiceService } from './api-service.service';

import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';




@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: ApiServiceService, private cookieService: CookieService,
    private myRoute: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.cookieService.get('token')) {
        return true;
      }
        this.myRoute.navigate(['login']);
        return false;

  }
}
