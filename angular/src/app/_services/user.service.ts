import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', httpOptions);
  }

  saveUser(username: string, email: string, password: string, roles: Array<number>): Observable<any>{
    return this.http.post(API_URL + 'user', {
      username,
      email,
      password,
      roles
    }, httpOptions)
  }
  getUsers(): Observable<any> {
    return this.http.get(API_URL + 'users', httpOptions);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(API_URL + 'user/'+id, httpOptions)
  }

  getUser(id: any): Observable<any> {
    return this.http.get(API_URL + 'user/'+id, httpOptions)
  }

  updateUser(id: number, username: string, email: string, password: string, roles: Array<number>): Observable<any>{
    return this.http.put(API_URL + 'user', {
      id,
      email,
      password,
      roles
    }, httpOptions)
  }

  getRoles(): Observable<any>{
    return this.http.get(API_URL + 'roles', httpOptions);
  }
}
