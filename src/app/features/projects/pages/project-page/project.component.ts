import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.interface';
import { mockedData } from '../../../../../mocks/mock_projects';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from '../../../../shared/components/not-found-page/not-found-page.component';

@Component({
  selector: 'app-project-page',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: true,
  imports: [CommonModule, NotFoundPageComponent],
})
export class ProjectComponent implements OnInit {
  projectId: number | null = null;
  project: Project | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const projectIdParam = this.route.snapshot.paramMap.get('projectId');
    this.projectId = projectIdParam ? +projectIdParam : null;

    this.project = mockedData.find((p) => p.id === this.projectId) ?? null;
  }
}
