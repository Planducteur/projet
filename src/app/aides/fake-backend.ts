import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// baie dans le stockage local pour les utilisateurs enregistrés
let users = JSON.parse(localStorage.getItem('users')) || [];
// baie dans le stockage local pour les rdv enregistrés
let rdvs = JSON.parse(localStorage.getItem('rdvs')) || [];
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

// envelopper dans observable retardé pour simuler l'appel de serveur api
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // appel se matérialise et se dématérialise pour assurer un retard même en cas d'erreur
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
//pour les rdv
                case url.endsWith('/rdvs/register') && method === 'POST':
                    return registerrdv();
                case url.endsWith('/rdvs') && method === 'GET':
                    return getUsersrdv();
                case url.match(/\/rdvs\/\d+$/) && method === 'DELETE':
                    return deleteUserrdv();
                default:
// transmettre toutes les demandes non traitées ci-dessus
                    return next.handle(request);
            }    
        }

// fonctions d'itinéraire

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Identifiant ou le mot de passe est incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }
//enregistrer de utilisateurs
        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('utilisateur "' + user.username + '" est déjà pris')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }
//lire utilisateur
        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }
//effacer utilisateur
        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }
//enregistrer des rdv
        function registerrdv() {
            const rdv = body

            if (rdvs.find(x => x.rdvname === rdv.rdvname)) {
                return error('rdv "' + rdv.rdv + '" is already taken')
            }

            rdv.id = rdvs.length ? Math.max(...rdvs.map(x => x.id)) + 1 : 1;
            rdvs.push(rdv);
            localStorage.setItem('rdvs', JSON.stringify(rdvs));

            return ok();
        }
//lire rdv
        function getUsersrdv() {
            if (!isLoggedIn()) 
            return unauthorized();
            return ok(rdvs);
        }
//effacer rdv
        function deleteUserrdv() {
            if (!isLoggedIn()) return unauthorized();

            rdvs = rdvs.filter(x => x.id !== idFromUrl());
            localStorage.setItem('rdvs', JSON.stringify(rdvs));
            return ok();
        }
// fonctions d'assistance

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Non autorisé' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
// utiliser un faux backend à la place du service Http pour un développement sans backend
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};