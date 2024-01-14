import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-small-footer',
  template: `
    <div class="flex justify-content-between mx-5">
      <div class="flex text-xs gap-3">
        <div>© 2023 Codu Team. All rights reserved.</div>
        <div class="underline">Privacy Policy</div>
        <div class="underline">Terms of Service</div>
        <div class="underline">Cookies Settings</div>
      </div>

      <div class="flex gap-3">
        <i class="pi pi-facebook text-base"></i>
        <i class="pi pi-instagram text-base"></i>
        <i class="pi pi-twitter text-base"></i>
        <i class="pi pi-linkedin text-base"></i>
        <i class="pi pi-youtube text-base"></i>
      </div>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallFooterComponent {}
