import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionDto } from '../../models/position-dto.interface';
import { ButtonModule } from 'primeng/button';

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
}
