import { ProjectCategory } from './project/project-category/project-category.enum';

export interface Project {
  id: number;
  imageScr?: string;
  title: string;
  description: string;
  category: ProjectCategory;
  participants: ProjectParticipant[];
}

export interface ProjectParticipant {
  userId: number;
  imageSrc: string;
  userName: string;
}
