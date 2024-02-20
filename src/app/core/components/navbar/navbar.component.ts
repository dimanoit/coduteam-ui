import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CreateProjectDialogComponent } from '../../../features/projects/components/create-project-dialog/create-project-dialog.component';
import { NgClass, NgIf } from '@angular/common';
import { ThemeService } from '../../../shared/services/theme.service';
import { AuthService } from '../../../features/user/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ThemeService],
  imports: [
    MenubarModule,
    ButtonModule,
    CreateProjectDialogComponent,
    NgIf,
    NgClass,
  ],
})
export class NavbarComponent implements OnInit {
  private userService = inject(AuthService);
  private router = inject(Router);
  private themeService = inject(ThemeService);

  items: MenuItem[] | undefined;
  isLoggedIn = this.userService.isUserLoggedIn;
  isLightTheme = this.themeService.isLightTeam;

  ngOnInit(): void {
    this.items = [
      { label: 'Projects', routerLink: 'projects' },

      { label: 'Positions', routerLink: 'positions' },
    ];
  }

  toggleTheme() {
    this.themeService.switchTheme();
  }

  async logout(): Promise<void> {
    this.userService.logout();
    await this.router.navigateByUrl('');
  }
}
