import { Injectable, signal } from '@angular/core';
import { AuthToken } from '../models/auth-token.interface';
import { AuthDto } from '../models/user.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn = signal(this.getIsUserLoggedIn());

  constructor(private http: HttpClient) {}

  login(authDto: AuthDto): Observable<void> {
    return this.http
      .post<AuthToken>('/login', authDto)
      .pipe(map((authToken) => this.setupUserState(authToken)));
  }

  logout() {
    this.isUserLoggedIn.set(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  getAuthToken() {
    return localStorage.getItem('token');
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
