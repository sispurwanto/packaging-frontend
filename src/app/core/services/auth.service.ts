import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private TOKEN_KEY = 'token';
    private isBrowser: boolean;
    
    constructor(
        private http: HttpClient, 
        private router: Router,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, { username, password });
    }

    logout(): void {
        if (this.isBrowser) {
            localStorage.removeItem(this.TOKEN_KEY);
            localStorage.removeItem('user');
        }
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        if (!this.isBrowser) return false;
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    setToken(token: string): void {
        if (this.isBrowser) {
        localStorage.setItem(this.TOKEN_KEY, token);
        }
    }

    getToken(): string | null {
        if (!this.isBrowser) return null;
        return localStorage.getItem(this.TOKEN_KEY);
    }
    // isAuthenticated() { 
    //     return !!this.getToken(); 
    // }
}