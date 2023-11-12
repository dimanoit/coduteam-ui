import { Injectable } from '@angular/core';
import { User, LoginDto } from './user.interface';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userLoggedInSubject = new Subject<User | null>();
  private isLoggedInStatus: boolean = false;

  mockedTestUser: User = {
    userId: 123,
    email: 'jane.doe@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    dateOfBirth: new Date(1985, 6, 15),
    gender: 'Female',
    title: 'Senior Developer',
    role: 'Software Engineering',
    cv: 'Extensive experience in software development...',
  };

  constructor() {
    this.userLoggedInSubject.subscribe((user) => {
      this.isLoggedInStatus = !!user;
    });
  }

  login(loginDto: LoginDto): Observable<User | null> {
    if (this.mockedTestUser.email === loginDto.email) {
      this.userLoggedInSubject.next(this.mockedTestUser);
      return of(this.mockedTestUser);
    }

    return of(null);
  }

  logout() {
    this.userLoggedInSubject.next(null);
  }

  onUserLogin(): Observable<User | null> {
    return this.userLoggedInSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }
}
