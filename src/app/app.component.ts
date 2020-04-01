import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services';
import { User } from './modeles';

import './contenu/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    
    //sortir de le application
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    //ajouter rdv
    aRDV() {
        this.router.navigate(['home1']);
    }
}