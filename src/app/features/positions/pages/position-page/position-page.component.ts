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
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectLineComponent } from '../../../projects/components/project-line/project-line.component';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { truncateString } from '../../../../shared/utils/utilities';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { TagModule } from 'primeng/tag';

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
    ProjectLineComponent,
    DividerModule,
    ButtonModule,
    BreadcrumbModule,
    TagModule,
  ],
})
export class PositionPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private positionService = inject(PositionService);
  private positionApplyService = inject(PositionApplyService);
  private sanitizer = inject(DomSanitizer);
  public state = inject(State);
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  selectedPosition = computed(() => this.state.position.selectedPosition());
  projectDescription = computed(() =>
    truncateString(this.selectedPosition()?.project?.description ?? '', 200),
  );
  safeDescription = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(
      this.state.position.selectedPosition()?.description ?? '',
    ),
  );

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
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
      .subscribe(() => {
        this.items = [
          { label: 'Positions' },
          { label: this.selectedPosition()?.positionCategory },
          { label: this.selectedPosition()?.project?.title },
        ];
      });
  }

  changeApplicantStatus(request: ChangePositionApplyStatusRequest) {
    this.positionApplyService.changePositionApplyStatus(request).subscribe();
  }
}
