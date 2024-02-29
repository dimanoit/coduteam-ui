import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { PositionLineComponent } from '../../components/position-line/position-line.component';
import { filter, map, switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PositionService } from '../../services/position.service';
import { State } from '../../../../state';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PositionApplicantComponent } from '../../components/position-applicant/position-applicant.component';
import { ChangePositionApplyStatusRequest } from '../../models/change-position-apply-status-request.interface';
import { PositionApplyService } from '../../services/position-apply.service';

@Component({
  selector: 'app-position',
  templateUrl: './position-page.component.html',
  styleUrls: ['./position-page.component.scss'],
  standalone: true,
  providers: [PositionService, PositionApplyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PositionLineComponent,
    CardModule,
    ScrollPanelModule,
    PositionApplicantComponent,
  ],
})
export class PositionPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private positionService = inject(PositionService);
  private positionApplyService = inject(PositionApplyService);
  public state = inject(State);

  selectedPosition = computed(() => this.state.position.selectedPosition());

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => params['positionId']),
        filter((value) => value),
        switchMap((positionId: number) =>
          this.positionService
            .loadSelectedPosition(positionId)
            .pipe(takeUntilDestroyed(this.destroyRef)),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  changeApplicantStatus(request: ChangePositionApplyStatusRequest) {
    this.positionApplyService.changePositionApplyStatus(request).subscribe();
  }
}
