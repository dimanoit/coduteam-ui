import { Injectable, signal } from '@angular/core';
import { AuthToken } from '../models/auth-token.interface';
import { AuthDto } from '../models/user.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenManagementService } from './token-management.service';
import { State } from '../../../store/state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn = signal(!!this.tokenManagementService.getAuthToken());

  constructor(
    private http: HttpClient,
    private state: State,
    private tokenManagementService: TokenManagementService,
  ) {}

  logout() {
    this.isUserLoggedIn.set(false);
    this.tokenManagementService.removeTokens();
  }

  login(authDto: AuthDto): Observable<void> {
    return this.http
      .post<AuthToken>('/auth/login', authDto)
      .pipe(map((authToken) => this.storeTokenOnAuth(authToken)));
  }

  refreshToken(): Observable<void> {
    const body = {
      refreshToken: localStorage.getItem('refreshToken'),
    };

    return this.http
      .post<AuthToken>('/auth/refresh', body)
      .pipe(map((token) => this.storeTokenOnAuth(token)));
  }

  private storeTokenOnAuth(authToken: AuthToken) {
    if (!authToken) {
      return;
    }

    this.isUserLoggedIn.set(true);
    this.tokenManagementService.addTokens(authToken);
  }
}
