
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User } from '@/modeles';
import { AlertService, UserService, AuthenticationService } from '@/services';

@Component({ templateUrl: 'home1.component.html' })
export class HomeComponent1 implements OnInit {
    rdvForm: FormGroup;
    loading = false;
    submitted = false;
    currentUser: User;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
//rediriger vers la maison si déjà connecté
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/home1']);
        }
    }
//récupérer les valeurs sur le formulaire html et mettre ça dans les variables
    ngOnInit() {

        this.rdvForm = this.formBuilder.group({
            titre: ['', Validators.required],
            rdvname: ['', Validators.required],
            date: [, Validators.required],
           user: [this.authenticationService.currentUserValue.username, Validators.required ]
           
        });
    }

// getter pratique pour un accès facile aux champs de formulaire
    get f() { return this.rdvForm.controls; }

    onSubmit() {
        this.submitted = true;

// réinitialiser les alertes lors de la soumission
        this.alertService.clear();

// arrêtez-vous ici si le formulaire n'est pas valide
        if (this.rdvForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.registerRDV(this.rdvForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
   
}
