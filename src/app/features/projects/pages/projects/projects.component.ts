import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.interface';
import { mockedData } from '../../models/mock_projects';
import {ProjectCardComponent} from "../../components/project-card/project-card.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  imports: [
    ProjectCardComponent,
    CommonModule
  ],
  standalone: true
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];


  ngOnInit(): void {
    this.projects = mockedData;
  }
}
