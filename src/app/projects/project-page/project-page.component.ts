import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project.interface';
import { mockedData } from '../mock_projects';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {
  projectId: number | null = null;
  project: Project | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const projectIdParam = this.route.snapshot.paramMap.get('projectId');
    this.projectId = projectIdParam ? +projectIdParam : null;

    this.project = mockedData.find((p) => p.id === this.projectId) || null;
  }
}
