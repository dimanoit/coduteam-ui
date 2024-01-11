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
import { mockedPositions } from 'src/mocks/mocked_positions';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-project-page',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: true,
  providers: [ProjectService],
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
  constructor(protected projectState: ProjectState) {}

  protected mockedPositions = mockedPositions;
}
