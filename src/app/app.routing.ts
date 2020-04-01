import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { HomeComponent1 } from './home1';
import { HomeComponent2 } from './home2';
import { LoginComponent } from './identifier';
import { InscrireComponent } from './inscrire';
import { AuthGuard } from './aides';
//les routes sur l'application
const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home1', component: HomeComponent1, canActivate: [AuthGuard] },
    { path: 'home2', component: HomeComponent2, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: InscrireComponent },

    // Autrement il va le diriger vers home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);