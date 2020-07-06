import { Injectable } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RoleGuard {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot) {
        let userRoles = this.authService.getCurrentUserRoles();
        if(userRoles) {
            if(route.data.roles) {
                if(userRoles.some(r=>route.data.roles.indexOf(r)>=0)) {
                    return true;
                }
                else {
                    this.router.navigateByUrl('planets');
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}
