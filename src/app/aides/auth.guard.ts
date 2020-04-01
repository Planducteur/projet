import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
// autorisé donc retour vrai
            return true;
        }

// pas connecté donc redirigez-vous vers la page de connexion avec l'URL de retour
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}