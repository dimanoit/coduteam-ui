import { Injectable } from '@angular/core';
import { User, LoginDto } from '../models/user.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mockedTestUser } from '../../../../mocks/mock_user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(
    this.getUserFromLocalStorage(),
  );

  private mockedTestUser = mockedTestUser;
  private isLoggedInStatus = false;

  constructor() {
    this.userSubject.subscribe((user) => {
      this.isLoggedInStatus = !!user;
    });
  }
  login(loginDto: LoginDto): Observable<User | null> {
    if (this.mockedTestUser.email === loginDto.email) {
      this.userSubject.next(this.mockedTestUser);
      localStorage.setItem('user', JSON.stringify(this.mockedTestUser));
      return of(this.mockedTestUser);
    }

    return of(null);
  }

  logout() {
    this.userSubject.next(null);
  }

  getUser$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
}
