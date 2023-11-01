import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  opportunities: CarouselItem[] = [
    {
      title: 'Project Discovery',
      description:
        'Easily browse and explore a wide variety of projects in different domains and technologies.',
    },
    {
      title: 'Team Finding',
      description:
        'Connect with other developers who share your interests and collaborate on exciting projects.',
    },
    {
      title: 'Skill Development',
      description:
        'Improve your coding skills through hands-on experience and learning from experienced mentors.',
    },
  ];

  skills: CarouselItem[] = [
    {
      title: 'Networking',
      description:
        'Connect with like-minded developers and professionals, expanding your professional network.',
    },
    {
      title: 'Experience',
      description:
        'Work on real-world projects, gaining hands-on experience and enhancing your skillset.',
    },
  ];
}

interface CarouselItem {
  title: string;
  description: string;
}
