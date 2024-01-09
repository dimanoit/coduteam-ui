import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from '../../../../shared/components/not-found-page/not-found-page.component';
import { ProjectService } from '../../services/project.service';
import { ProjectState } from '../../state/project.state';

@Component({
  selector: 'app-project-page',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: true,
  imports: [CommonModule, NotFoundPageComponent],
})
export class ProjectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    protected projectState: ProjectState,
  ) {}

  ngOnInit() {
    const projectIdParam = this.route.snapshot.paramMap.get('projectId');

    if (!projectIdParam) {
      return;
    }

    this.projectService
      .loadProjects({
        projectId: +projectIdParam,
      })
      .subscribe();
  }
}
