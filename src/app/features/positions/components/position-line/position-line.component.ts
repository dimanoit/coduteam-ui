import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionDto } from '../../models/position-dto.interface';
import { ButtonModule } from 'primeng/button';
import { openInNewTab } from '../../../../shared/utils/utilities';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-position-line',
  standalone: true,
  imports: [CommonModule, ButtonModule, TagModule],
  templateUrl: './position-line.component.html',
  styleUrls: ['./position-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionLineComponent {
  @Input() position!: PositionDto;

  navigateToPositionPage(): void {
    openInNewTab(`/positions/${this.position?.id}`);
  }
}
