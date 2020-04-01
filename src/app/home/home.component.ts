import { Component, OnInit , Input} from '@angular/core';
import { first } from 'rxjs/operators';

import { User , RDV } from '@/modeles';
import { UserService, AuthenticationService } from '@/services';
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    rdvs = [];
    users = [];
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllRDV();
    }
//effacer un rdv
    deleteRDV(id: number) {
        this.userService.deleteRDV(id)
            .pipe(first())
            .subscribe(() => this.loadAllRDV());
    }
//lire tout les rdv
    private loadAllRDV() {
        this.userService.getRDV()
            .pipe(first())
            .subscribe( rdv => this.rdvs = rdv);
    }

}


