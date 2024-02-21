import { Component, DestroyRef, effect, inject, OnInit } from '@angular/core';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SmallFooterComponent } from './core/components/small-footer/small-footer.component';
import { ThemeService } from './shared/services/theme.service';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { State } from './state';
import { UserService } from './features/user/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NavbarComponent,
    RouterOutlet,
    SmallFooterComponent,
    ToastModule,
    ProgressBarModule,
  ],
  providers: [ThemeService, UserService],
  standalone: true,
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);
  private userService = inject(UserService);
  protected state = inject(State);
  private destroyRef = inject(DestroyRef);
  title = 'my-first-project';

  ngOnInit(): void {
    this.themeService.loadTheme();
    this.userService
      .loadCurrentUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
