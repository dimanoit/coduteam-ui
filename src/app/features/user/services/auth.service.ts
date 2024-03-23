import { inject, Injectable } from '@angular/core';
import { AuthToken } from '../models/auth-token.interface';
import { AuthDto } from '../models/user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(authDto: AuthDto): Observable<AuthToken> {
    return this.http.post<AuthToken>('/auth/login', authDto);
  }

  refreshToken(refreshToken: string): Observable<AuthToken> {
    const body = {
      refreshToken: refreshToken,
    };

    return this.http.post<AuthToken>('/auth/refresh', body);
  }
}
