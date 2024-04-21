import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { PositionLineComponent } from '../../components/position-line/position-line.component';
import { filter, map, tap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PositionService } from '../../services/position.service';
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
import { TagModule } from 'primeng/tag';
import { PositionDto } from '../../models/position-dto.interface';
import { ApplyOnPositionRequest } from '../../models/apply-on-position-request.interface';
import { Store } from '../../../../store/store';
import { DatePipe } from '@angular/common';

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
    DatePipe,
  ],
})
export class PositionPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private sanitizer = inject(DomSanitizer);
  public store = inject(Store);

  selectedPosition: Signal<PositionDto | null> = this.store.selectedPosition;
  similarPositions: Signal<PositionDto[]> = this.store.similarPositions;

  projectDescription = computed(() =>
    truncateString(this.selectedPosition()?.project?.description ?? '', 200),
  );
  safeDescription = computed(() => {
    // TODO introduce util function
    let description = this.selectedPosition()?.description ?? '';

    // Delete all text colors because it can brake site theme
    description = description.replace(
      /(color\s*:\s*[^;]*;)|(background-color\s*:\s*[^;]*;)/gi,
      '',
    );
    return this.sanitizer.bypassSecurityTrustHtml(description);
  });

  breadcrumbs = computed(() => [
    { icon: 'pi pi-home', routerLink: '/' },
    { label: 'Positions', routerLink: '/positions' },
    {
      label: this.selectedPosition()?.positionCategory,
      routerLink: '/positions',
    },
    {
      label: this.selectedPosition()?.project?.title,
      routerLink: `/projects/${this.selectedPosition()?.project?.id}`,
    },
  ]);

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => params['positionId']),
        filter((value) => value),
        tap((positionId: number) =>
          this.store.updateSelectedPositionId(positionId),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    const selectedPositionId = this.store.selectedPositionId;
    this.store.loadSelectedPosition(selectedPositionId);
  }

  applyOnPosition(): void {
    const request: ApplyOnPositionRequest = {
      positionId: this.selectedPosition()!.id,
    };

    this.store.applyOnPosition(request);
  }

  changeApplicantStatus(request: ChangePositionApplyStatusRequest): void {
    this.store.changeApplicationStatus(request);
  }
}
