import { Injectable, signal } from '@angular/core';
import {
  User,
  AuthDto,
  AccountRegistrationDto,
} from '../models/user.interface';
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
    return this.http
      .post<AuthToken>('/login', authDto)
      .pipe(map((authToken) => this.setupUserState(authToken)));
  }

  register(authDto: AuthDto): Observable<void> {
    return this.http.post<void>('/register', authDto);
  }

  finishRegistration(
    finishRegistrationDto: AccountRegistrationDto,
  ): Observable<void> {
    return this.http.post<void>('/api/account', finishRegistrationDto);
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
