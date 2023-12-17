import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.interface';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from '../../../../shared/components/not-found-page/not-found-page.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: true,
  imports: [CommonModule, NotFoundPageComponent],
})
export class ProjectComponent implements OnInit {
  project!: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) {}

  ngOnInit() {
    const projectIdParam = this.route.snapshot.paramMap.get('projectId');

    if (!projectIdParam) {
      return;
    }

    this.projectService
      .getProjects({
        projectId: +projectIdParam,
      })
      .subscribe((p) => (this.project = p[0]));
  }
}
