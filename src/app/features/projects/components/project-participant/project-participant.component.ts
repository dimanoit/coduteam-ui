import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ProjectParticipant } from '../../models/project.interface';

@Component({
  selector: 'app-project-participant',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './project-participant.component.html',
  styleUrl: './project-participant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectParticipantComponent {
  @Input() participant!: ProjectParticipant;
}
