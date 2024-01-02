import { Injectable } from '@angular/core';
import { AuthToken } from '../models/auth-token.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenManagementService {
  removeTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  addTokens(authToken: AuthToken) {
    localStorage.setItem('token', authToken.accessToken);
    localStorage.setItem('refreshToken', authToken.refreshToken);
    localStorage.setItem(
      'expirationTime',
      this.getExpirationDate(authToken.expiresIn),
    );
  }

  getAuthToken() {
    const token = localStorage.getItem('token');
    return token ?? '';
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isTokenExpired() {
    const expirationTimeString = localStorage.getItem('expirationTime');

    if (!expirationTimeString) {
      return true;
    }

    const expirationTime = new Date(expirationTimeString);
    return expirationTime <= new Date();
  }

  private getExpirationDate(expiresInSeconds: number) {
    const expirationTimestamp = Date.now() + expiresInSeconds * 1000;
    const expirationDate = new Date(expirationTimestamp);

    return expirationDate.toISOString();
  }
}
