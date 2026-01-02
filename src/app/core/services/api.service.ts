import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Steelcase } from '../../models/steelcase.model';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) {}

    // users
    listUsers() { return this.http.get<User[]>(`${environment.apiUrl}/users`); }
    getUser(id: number) { return this.http.get<User>(`${environment.apiUrl}/users/${id}`); }
    createUser(payload: User) { return this.http.post(`${environment.apiUrl}/users`, payload); }
    updateUser(id:number,payload:User){ return this.http.put(`${environment.apiUrl}/users/${id}`, payload); }
    deleteUser(id:number){ return this.http.delete(`${environment.apiUrl}/users/${id}`); }


    // steelcases
    listSteelcases(){ 
        return this.http.get<Steelcase[]>(`${environment.apiUrl}/steelcases`); 
    }
    getSteelcases(id: number) {
        return this.http.get<Steelcase>(`${environment.apiUrl}/steelcases/${id}`);
    }
    createSteelcase(p:Steelcase){ 
        return this.http.post(`${environment.apiUrl}/steelcases`, p); 
    }
    updateSteelcase(id:number,p:Steelcase){
        return this.http.put(`${environment.apiUrl}/steelcases/${id}`, p); 
    }
    deleteSteelcase(id:number){ 
        return this.http.delete(`${environment.apiUrl}/steelcases/${id}`); 
    }


    // projects
    listProjects(){ return this.http.get<Project[]>(`${environment.apiUrl}/project`); }
    getProject(id:string){ return this.http.get<Project>(`${environment.apiUrl}/re_packing/${id}`); }
    // createProject(p:Project){ return this.http.post(`${environment.apiUrl}/packing`, p); }
    createProject(payload: {
            project_name: string;
            steelcase_code: number;
            file: File;
        }) 
        {
        const formData = new FormData();

        formData.append('project_name', payload.project_name);
        formData.append('steelcase_code', String(payload.steelcase_code));
        formData.append('file', payload.file); // penting!

        return this.http.post(`${environment.apiUrl}/packing`, formData);
    }

    uploadProjectExcel(id:number, file: File){
        const fd = new FormData(); fd.append('file', file);
        return this.http.post(`${environment.apiUrl}/project/${id}/upload`, fd);
    }
    exportProjectExcel(id:number){ return this.http.get(`${environment.apiUrl}/project/${id}/export`, { responseType: 'blob' }); }
}