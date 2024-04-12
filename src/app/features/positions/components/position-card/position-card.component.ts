import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { PositionDto } from '../../models/position-dto.interface';
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-position-card',
  standalone: true,
  imports: [TagModule],
  templateUrl: './position-card.component.html',
  styleUrl: './position-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionCardComponent {
  @Input() position!: PositionDto;
  private router = inject(Router);

  async navigateToPositionPage() {
    await this.router.navigateByUrl(`/positions/${this.position?.id}`);
  }
}
