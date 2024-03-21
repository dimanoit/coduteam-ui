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

export enum ProjectCategory {
  None = 'None',
  FoodAndBeverages = 'Food and Beverages',
  Pharmaceuticals = 'Pharmaceuticals',
  Marketing = 'Marketing',
  Gaming = 'Gaming',
  Finance = 'Finance',
  Biotech = 'Biotech',
  Defence = 'Defence',
  RealEstate = 'Real Estate',
  Logistics = 'Logistics',
  Government = 'Government',
  Media = 'Media',
  Healthcare = 'Healthcare',
  Education = 'Education',
  Fashion = 'Fashion',
}
