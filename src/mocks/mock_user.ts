import { User } from '../app/features/user/models/user.interface';

export const mockedTestUser: User = {
  userId: 123,
  email: 'jane.doe@example.com',
  firstName: 'Jane',
  lastName: 'Doe',
  dateOfBirth: new Date(1985, 6, 15),
  gender: 'Female',
  title: 'Senior Developer',
  role: 'Software Engineering',
  cv: 'Extensive experience in software development...',
  profileImage: '',
};
