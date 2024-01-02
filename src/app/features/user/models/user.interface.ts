export interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  profileImage: string;
  gender: string;
  title: string;
  role: string;
  cv: string;
}

export interface AuthDto {
  email: string;
  password: string;
}

export interface AccountRegistrationDto {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  NonBinary = 'NonBinary',
}
