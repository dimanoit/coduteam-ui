import { Component, effect, inject, OnInit } from '@angular/core';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SmallFooterComponent } from './core/components/small-footer/small-footer.component';
import { ThemeService } from './shared/services/theme.service';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { State } from './state';

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
  providers: [ThemeService],
  standalone: true,
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);
  protected state = inject(State);

  title = 'my-first-project';

  constructor() {
    effect(() => {
      console.log(this.state.isLoading());
    });
  }

  ngOnInit(): void {
    this.themeService.loadTheme();
  }
}
