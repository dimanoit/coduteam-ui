export interface Project {
  id: number;
  imageScr?: string;
  title: string;
  description: string;
  category: string;
  participants: ProjectParticipant[];
}

export interface ProjectParticipant {
  userId: number;
  imageSrc: string;
  userName: string;
}

