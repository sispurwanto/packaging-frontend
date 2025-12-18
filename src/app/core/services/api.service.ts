import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) {}

    // users
    listUsers() { return this.http.get(`${environment.apiUrl}/users`); }
    createUser(payload: any) { return this.http.post(`${environment.apiUrl}/users`, payload); }
    updateUser(id:number,payload:any){ return this.http.put(`${environment.apiUrl}/users/${id}`, payload); }
    deleteUser(id:number){ return this.http.delete(`${environment.apiUrl}/users/${id}`); }


    // steelcases
    listSteelcases(){ 
        return this.http.get(`${environment.apiUrl}/steelcases`); 
    }
    createSteelcase(p:any){ 
        return this.http.post(`${environment.apiUrl}/steelcases`, p); 
    }
    updateSteelcase(id:number,p:any){
        return this.http.put(`${environment.apiUrl}/steelcases/${id}`, p); 
    }
    deleteSteelcase(id:number){ 
        return this.http.delete(`${environment.apiUrl}/steelcases/${id}`); 
    }


    // projects
    listProjects(){ return this.http.get(`${environment.apiUrl}/projects`); }
    getProject(id:number){ return this.http.get(`${environment.apiUrl}/projects/${id}`); }
    createProject(p:any){ return this.http.post(`${environment.apiUrl}/projects`, p); }
    uploadProjectExcel(id:number, file: File){
    const fd = new FormData(); fd.append('file', file);
    return this.http.post(`${environment.apiUrl}/projects/${id}/upload`, fd);
    }
    exportProjectExcel(id:number){ return this.http.get(`${environment.apiUrl}/projects/${id}/export`, { responseType: 'blob' }); }
}