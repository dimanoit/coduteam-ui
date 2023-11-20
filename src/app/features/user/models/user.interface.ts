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

export interface LoginDto {
  email: string;
  password: string;
}
