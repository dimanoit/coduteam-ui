import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionDto } from '../../models/position-dto.interface';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  async navigateToPositionPage() {
    await this.router.navigateByUrl(`/positions/${this.position?.id}`);
  }
}
