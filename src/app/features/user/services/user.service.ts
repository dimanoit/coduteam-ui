import { Injectable, signal } from '@angular/core';
import { User, AuthDto } from '../models/user.interface';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthToken } from '../models/auth-token.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  isUserLoggedIn = signal(this.getIsUserLoggedIn());

  login(authDto: AuthDto): Observable<void> {
    return this.callAuthEndpoint('/login', authDto);
  }

  register(authDto: AuthDto): Observable<void> {
    return this.callAuthEndpoint('/register', authDto);
  }

  logout() {
    this.isUserLoggedIn.set(false);
    localStorage.clear();
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  private getIsUserLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

  private callAuthEndpoint(
    endpoint: string,
    authDto: AuthDto,
  ): Observable<void> {
    return this.http
      .post<AuthToken>(endpoint, authDto)
      .pipe(map((authToken) => this.setupUserState(authToken)));
  }

  private setupUserState(authToken: AuthToken) {
    if (authToken) {
      this.isUserLoggedIn.set(true);
      localStorage.setItem('token', JSON.stringify(authToken.accessToken));
      localStorage.setItem(
        'refreshToken',
        JSON.stringify(authToken.refreshToken),
      );
    }
  }
}
