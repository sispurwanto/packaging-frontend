import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Steelcase } from '../../models/steelcase.model';

@Injectable({ providedIn: 'root' })
export class SteelcaseService {
  private base = `${environment.apiUrl}/steelcases`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Steelcase[]>(this.base);
  }

  get(id: number) {
    return this.http.get<Steelcase>(`${this.base}/${id}`);
  }

  create(payload: Steelcase) {
    return this.http.post(this.base, payload);
  }

  update(id: number, payload: Steelcase) {
    return this.http.put(`${this.base}/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
