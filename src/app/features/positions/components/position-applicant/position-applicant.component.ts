import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PositionApplicant } from '../../models/position-applicant.interface';
import { AvatarModule } from 'primeng/avatar';
import { PositionApplyStatus } from '../../models/position-apply-status';
import { ButtonModule } from 'primeng/button';
import { ChangePositionApplyStatusRequest } from '../../models/change-position-apply-status-request.interface';

@Component({
  selector: 'app-position-applicant',
  standalone: true,
  imports: [AvatarModule, ButtonModule],
  templateUrl: './position-applicant.component.html',
  styleUrl: './position-applicant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionApplicantComponent {
  @Input() applicant!: PositionApplicant;
  @Output() changeApplicantStatus =
    new EventEmitter<ChangePositionApplyStatusRequest>();

  statuses = PositionApplyStatus;

  changeStatus(status: PositionApplyStatus) {
    const request: ChangePositionApplyStatusRequest = {
      positionApplyId: this.applicant.positionApplyId,
      status,
    };

    this.changeApplicantStatus.emit(request);
  }
}
