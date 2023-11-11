import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../project.interface';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() project!: Project;

  getImageUrl(): string {
    return 'https://source.unsplash.com/random/200x200?sig=' + this.project.id;
  }
}
