import { Component, OnInit } from '@angular/core';
import { Project } from './project.interface';
import { mockedData } from './mock_projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  ngOnInit(): void {
    this.projects = mockedData;
  }
}
