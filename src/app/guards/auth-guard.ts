import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor
    (
        private authService: AuthService, 
        private router: Router,
        private snackBar: MatSnackBar
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
        if(!this.authService.isLoggedIn()) {
           this.router.navigateByUrl('');
           this.snackBar.open("Token dostępu stracił ważność. Proszę się zalogować.", 'Ok', {duration: 3000, verticalPosition: 'top'});
           return false;
        } 
        return true;
    }
}
