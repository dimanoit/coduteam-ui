import { ProjectCategory } from '../components/project-card/project-category/project-category.enum';
import { Gender } from '../../user/models/user.interface';

export interface Project {
  id: number;
  projectImgUrl?: string;
  title: string;
  description: string;
  category: ProjectCategory;
  country: string;
  participants: ProjectParticipant[];
  ownerId: number;
}

export interface ProjectParticipant {
  userId: number;
  imageSrc: string;
  userName: string;
  firstName: string;
  lastName: string;
  projectTitle: string;
  technologies: string[];
  gender?: Gender;
}
