import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { NgForOf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [ButtonModule, FooterComponent, NgTemplateOutlet, NgForOf],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToAuth() {
    this.router.navigate(['/auth']);
  }

  opportunities: CarouselItem[] = [
    {
      title: 'Project Discovery',
      description:
        'Easily browse and explore a wide variety of projects in different domains and technologies.',
      imageSrc: 'project_discovery.png',
    },

    {
      title: 'Team Finding',
      description:
        'Connect with other developers who share your interests and collaborate on exciting projects.',
      imageSrc: 'team_finding.png',
    },
    {
      title: 'Skill Development',
      description:
        'Improve your coding skills through hands-on experience and learning from experienced mentors.',
      imageSrc: 'skill_development.png',
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

  getImageScr(item: CarouselItem): string {
    return '/assets/' + item.imageSrc;
  }
}

interface CarouselItem {
  title: string;
  description: string;
  imageSrc?: string;
}
