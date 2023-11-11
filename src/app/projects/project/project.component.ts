import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../project.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  @Input() project!: Project;

  getImageUrl(): string {
    return 'https://source.unsplash.com/random/200x200?sig=' + this.project.id;
  }
}
