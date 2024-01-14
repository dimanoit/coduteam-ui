import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from '../../../../shared/components/not-found-page/not-found-page.component';
import { ProjectService } from '../../services/project.service';
import { ProjectState } from '../../state/project.state';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProjectLineComponent } from '../../components/project-line/project-line.component';
import { CardModule } from 'primeng/card';
import { ProjectParticipantComponent } from '../../components/project-participant/project-participant.component';
import { PositionLineComponent } from '../../../positions/components/position-line/position-line.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { PositionState } from '../../../positions/position.state';
import { PositionService } from '../../../positions/services/position.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: true,
  providers: [ProjectService, PositionState, PositionService],
  imports: [
    CommonModule,
    NotFoundPageComponent,
    ProgressBarModule,
    ProjectLineComponent,
    CardModule,
    ProjectParticipantComponent,
    PositionLineComponent,
    ScrollPanelModule,
  ],
})
export class ProjectComponent {
  constructor(
    protected projectState: ProjectState,
    private projectService: ProjectService,
    protected positionState: PositionState,
    private positionService: PositionService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params: Params) => params['projectId']),
        filter((value) => value),
        switchMap((projectId: number) => {
          this.positionService.loadPositions({ projectId }).subscribe();

          return this.projectService.loadSelectedProject(projectId);
        }),
      )
      .subscribe();
  }
}
