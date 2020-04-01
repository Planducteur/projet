import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/modeles';
import { UserService, AuthenticationService } from '@/services';

@Component({ templateUrl: 'home2.component.html' })
export class HomeComponent2 implements OnInit {
    currentUser: User;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
    }
//effacer un utilisateur par id
    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }
//lire les utilisateurs et mettre dans la variable users
    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}