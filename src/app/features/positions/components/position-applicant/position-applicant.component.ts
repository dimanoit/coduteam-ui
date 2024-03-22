import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PositionApplicant } from '../../models/position-applicant.interface';
import { AvatarModule } from 'primeng/avatar';
import {
  PositionApplyStatus,
  PositionApplyStatusTags,
} from '../../models/position-apply-status';
import { ButtonModule } from 'primeng/button';
import { ChangePositionApplyStatusRequest } from '../../models/change-position-apply-status-request.interface';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-position-applicant',
  standalone: true,
  imports: [
    AvatarModule,
    ButtonModule,
    CardModule,
    TagModule,
    ToastModule,
    MenuModule,
  ],
  templateUrl: './position-applicant.component.html',
  styleUrl: './position-applicant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionApplicantComponent implements OnInit {
  @Input() applicant!: PositionApplicant;
  @Output() changeApplicantStatus =
    new EventEmitter<ChangePositionApplyStatusRequest>();
  items: MenuItem[] = [];

  positionApplyStatusTags: PositionApplyStatusTags = {
    [PositionApplyStatus.Sent]: 'primary',
    [PositionApplyStatus.OnReview]: 'info',
    [PositionApplyStatus.Rejected]: 'danger',
    [PositionApplyStatus.Confirmed]: 'success',
  };

  ngOnInit(): void {
    if (this.applicant.status === PositionApplyStatus.Sent) {
      const reviewMenuItem: MenuItem = {
        label: 'Review',
        icon: PrimeIcons.EYE,
        command: () => {
          this.changeStatus(PositionApplyStatus.OnReview);
        },
      };

      this.items = [reviewMenuItem];
    }

    if (this.applicant.status === PositionApplyStatus.OnReview) {
      const confirmAndRejectItems: MenuItem[] = [
        {
          label: 'Confirm',
          icon: PrimeIcons.CHECK_CIRCLE,
          command: () => {
            this.changeStatus(PositionApplyStatus.Confirmed);
          },
        },
        {
          label: 'Reject',
          icon: PrimeIcons.TIMES_CIRCLE,
          command: () => {
            this.changeStatus(PositionApplyStatus.Rejected);
          },
        },
      ];

      this.items = confirmAndRejectItems;
    }
  }

  changeStatus(status: PositionApplyStatus) {
    const request: ChangePositionApplyStatusRequest = {
      positionApplyId: this.applicant.positionApplyId,
      status,
    };

    this.changeApplicantStatus.emit(request);
  }
}
