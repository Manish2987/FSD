import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  private bearerToken: any;

  constructor(private routerService: RouterService,
    private authService: AuthenticationService) {
    

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.bearerToken = this.authService.getBearerToken();
    console.log('bearer token is ' + this.bearerToken);
    if(this.bearerToken === null)
    {
      this.authService.isUserLoggedIn.next(false);
      this.routerService.routeToLogin();
    }
    const booleanPromise = this.authService.isUserAuthenticated(this.bearerToken);
    
    const that = this;
    return booleanPromise.then(function (authenticated) {
      console.log('User authenticated ' + authenticated);
      if(authenticated)
      {
        that.authService.isUserLoggedIn.next(true);
      }
      else if (!authenticated) {
        that.authService.isUserLoggedIn.next(false);
        that.routerService.routeToLogin();
      }
      return authenticated;

    }, function (e) { return e; });

  }


}
