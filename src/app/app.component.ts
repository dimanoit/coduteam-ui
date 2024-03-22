import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SmallFooterComponent } from './core/components/small-footer/small-footer.component';
import { ThemeService } from './shared/services/theme.service';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { UserService } from './features/user/services/user.service';
import { UserStore } from './store/user.store';
import { GlobalStore } from './store/state';

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
  private userStore = inject(UserStore);
  
  title = 'my-first-project';
  isLoading = inject(GlobalStore).isLoading;
  currentUser = this.userStore.currentUser;

  ngOnInit(): void {
    this.themeService.loadTheme();
    this.userStore.loadCurrentUser();
  }
}
