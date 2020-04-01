import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        //effacer le message d'alerte sur route change tant que  'keepAfterRouteChange' flag est vrai
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // On garde un seul route change
                    this.keepAfterRouteChange = false;
                } else {
                    // effacer le message d'alerte
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }
//????????
    success(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'succès', text: message });
    }
//????????
    error(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'erreur', text: message });
    }
//????????
    clear() {
        //effacer en appelant subject.next() sans les paramètres 
        this.subject.next();
    }
}