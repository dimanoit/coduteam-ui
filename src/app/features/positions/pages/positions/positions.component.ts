import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { PositionComponent } from '../position/position.component';
import { PositionFilterComponent } from '../../components/position-filter/position-filter.component';
import { PositionLineComponent } from '../../components/position-line/position-line.component';
import { NgForOf } from '@angular/common';
import { PositionService } from '../../services/position.service';
import { State } from '../../../../state';
import { PositionApplyService } from '../../services/position-apply.service';
import { ApplyOnPositionRequest } from '../../models/apply-on-position-request.interface';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
  imports: [
    PositionComponent,
    PositionFilterComponent,
    PositionLineComponent,
    NgForOf,
    ProgressBarModule,
  ],
  providers: [PositionService, PositionApplyService, State],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PositionsComponent implements OnInit {
  positionService = inject(PositionService);
  positionApplyService = inject(PositionApplyService);

  state = inject(State);

  ngOnInit(): void {
    this.positionService.loadPositions().subscribe();
  }

  handleOnPositionApply(positionId: number): void {
    const request: ApplyOnPositionRequest = {
      positionId: positionId,
    };

    this.positionApplyService.applyOnPosition(request).subscribe();
  }
}
