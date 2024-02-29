import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { PositionFilterComponent } from '../../components/position-filter/position-filter.component';
import { PositionLineComponent } from '../../components/position-line/position-line.component';
import { NgForOf } from '@angular/common';
import { PositionService } from '../../services/position.service';
import { State } from '../../../../state';
import { PositionApplyService } from '../../services/position-apply.service';
import { ApplyOnPositionRequest } from '../../models/apply-on-position-request.interface';
import { ProgressBarModule } from 'primeng/progressbar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PositionDto } from '../../models/position-dto.interface';
import { PositionPageComponent } from '../position-page/position-page.component';

@Component({
  selector: 'app-positions',
  templateUrl: './positions-page.component.html',
  styleUrls: ['./positions-page.component.scss'],
  imports: [
    PositionPageComponent,
    PositionFilterComponent,
    PositionLineComponent,
    NgForOf,
    ProgressBarModule,
  ],
  providers: [PositionService, PositionApplyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PositionsPageComponent implements OnInit {
  positionService = inject(PositionService);
  positionApplyService = inject(PositionApplyService);
  destroyRef = inject(DestroyRef);

  state = inject(State);

  ngOnInit(): void {
    this.positionService
      .loadPositions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  handleOnPositionApply(positionId: number): void {
    const request: ApplyOnPositionRequest = {
      positionId: positionId,
    };

    this.positionApplyService
      .applyOnPosition(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  isPositionEditable(position: PositionDto) {
    return position.project.ownerId === this.state.user.currentUser()?.id;
  }
}
