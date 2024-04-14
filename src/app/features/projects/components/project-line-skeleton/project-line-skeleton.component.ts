import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { ItemSize } from '../../../../shared/enums/item-size.enum';

@Component({
  selector: 'app-project-line-skeleton',
  standalone: true,
  imports: [SkeletonModule, AvatarGroupModule, AvatarModule],
  templateUrl: './project-line-skeleton.component.html',
  styleUrl: './project-line-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectLineSkeletonComponent {
  @Input() size: ItemSize = ItemSize.M;

  get componentSize(): string {
    return ItemSize.S === this.size ? '60rem' : '65rem';
  }
}
