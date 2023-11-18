import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  template: `
    <div
      class="h-30rem flex flex-column justify-content-center align-items-center align-content-center"
    >
      <i class="pi pi-exclamation-triangle" style="font-size: 4em"></i>
      <h1>Page Not Found</h1>
      <p>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <p-button label="Go to Home" icon="pi pi-home" routerLink="/"></p-button>
    </div>
  `,
  imports: [ButtonModule, RouterLink],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {}
