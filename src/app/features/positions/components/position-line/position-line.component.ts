import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionDto } from '../../models/position-dto.interface';
import { ButtonModule } from 'primeng/button';
import { openInNewTab } from '../../../../shared/utils/utilities';

@Component({
  selector: 'app-position-line',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './position-line.component.html',
  styleUrls: ['./position-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionLineComponent {
  @Input() position!: PositionDto;
  @Input() isEditable = false;
  
  @Output() onPositionApply = new EventEmitter<number>();
  @Output() onRemovePosition = new EventEmitter<number>();

  applyOnPosition() {
    this.onPositionApply.emit(this.position.id);
  }

  removePosition() {
    this.onRemovePosition.emit(this.position.id);
  }

  navigateToPositionPage(): void {
    openInNewTab(`/positions/${this.position?.id}`);
  }
}
