import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, RDV  } from '@/modeles';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    //lire utilisateur
    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }
    //enregistrer utilisateur
    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }
    //delete utilisateur 
    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }

    //lire des rdv
    getRDV() {
        return this.http.get<RDV[]>(`${config.apiUrl}/rdvs`);
    }
    //enregistrer un rdv 
    registerRDV(rdv: RDV) {
        return this.http.post(`${config.apiUrl}/rdvs/register`, rdv);
    }
    //effacer un rdv
    deleteRDV(id: number) {
        return this.http.delete(`${config.apiUrl}/rdvs/${id}`);
    }
}