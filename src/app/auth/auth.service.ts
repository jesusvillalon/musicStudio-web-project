import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from 'src/environments/interfaces/userData.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) {};

   registerUser (userData: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/register`, userData)
   }

   loginUser (userData: {email: string, password: string}): Observable<any>{
    return this.http.post(`${this.baseUrl}/login`, userData);
   }

}
