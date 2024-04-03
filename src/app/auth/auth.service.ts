import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from 'src/environments/interfaces/userData.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/users'
  private localStorageKey = 'authToken';

  constructor(private http: HttpClient) {};


   registerUser (userData: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/register`, userData)
   }

   loginUser (userData: {email: string, password: string}): Observable<any>{
    return this.http.post(`${this.baseUrl}/login`, userData);
   }

   setAuthToken(token: string){
    localStorage.setItem(this.localStorageKey, token);
   }

   getAuthToken(): string | null {
    return localStorage.getItem(this.localStorageKey);
   }

   removeAuthToken(){
    localStorage.removeItem(this.localStorageKey);
   }

   isAuthenticated(): boolean {
    return !!this.getAuthToken();
   }

   getUserData(): Observable<UserData> {
    return this.http.get<UserData>(`${this.baseUrl}/userProfile/`);
   }

}
