import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  createUser(data): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getUser(id): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUser(id, data): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
