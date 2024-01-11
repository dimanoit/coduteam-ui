import { ProjectCategory } from '../components/project-card/project-category/project-category.enum';

export interface Project {
  id: number;
  projectImgUrl?: string;
  title: string;
  description: string;
  category: ProjectCategory;
  country: object;
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
}
