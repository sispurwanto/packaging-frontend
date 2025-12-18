import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, { username, password });
    }


    setToken(token: string) { 
        localStorage.setItem('token', token); 
    }
    getToken(): string | null { 
        return localStorage.getItem('token'); 
    }
    logout() { 
        localStorage.removeItem('token'); 
    }
    isAuthenticated() { 
        return !!this.getToken(); 
    }
}