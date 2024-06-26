import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { UserData } from 'src/environments/interfaces/userData.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';
  private localStorageKey = 'authToken';
  private userId?: string;

  constructor(private http: HttpClient) {}

  registerUser(userData: UserData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  loginUser(userData: {
    email: string;
    password: string;
  }): Observable<{ token: string; user: UserData }> {
    return this.http
      .post<{ token: string; user: UserData }>(`${this.baseUrl}/login`, userData)
      .pipe(
        tap((response: { token: string; user: any }) => {
          this.setAuthToken(response.token);
          this.setUserId(response.user.user_id);
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', response.user.user_id);
        })
      );
  }

  getUserData(): Observable<UserData> {
    const userId = localStorage.getItem('userId');
    return this.http.get<UserData>(`${this.baseUrl}/userProfile/${userId}`);
  }

  editUserData(userData: UserData): Observable<UserData> {
    const user_id = localStorage.getItem('userId');
    if (!user_id) {
      console.error('El userId es undefined o null. No se puede editar el usuario.');
    }
    return this.http.put<UserData>(`${this.baseUrl}/editUser/${user_id}`, userData)
  }

  setAuthToken(token: string) {
    localStorage.setItem(this.localStorageKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.localStorageKey);
  }

  removeAuthToken() {
    localStorage.removeItem(this.localStorageKey);
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId(): string | undefined {
    return this.userId;
  }

  removeUserIdFromStorage() {
    localStorage.removeItem('userId');
  }
}
