import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// utilisé pour créer le faux backend
import { fakeBackendProvider } from './aides';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './aides';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { HomeComponent2 } from './home2';
import { HomeComponent1 } from './home1';
import { LoginComponent } from './identifier';
import { InscrireComponent } from './inscrire';
import { AlertComponent } from './components';
import { RdvPipe } from './pipe.rdvpipe';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        HomeComponent1,
        HomeComponent2,
        LoginComponent,
        InscrireComponent,
        AlertComponent,
        RdvPipe

    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // fournisseur utilisé pour créer le faux backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };