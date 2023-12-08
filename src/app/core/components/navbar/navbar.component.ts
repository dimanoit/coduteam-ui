import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../../features/user/services/user.service';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CreateProjectDialogComponent } from '../../../features/projects/components/create-project-dialog/create-project-dialog.component';
import { NgClass, NgIf } from '@angular/common';
import { ThemeService } from '../../../shared/services/theme.service';

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
  private userService = inject(UserService);
  private router = inject(Router);
  private themeService = inject(ThemeService);

  items: MenuItem[] | undefined;
  isLoggedIn = this.userService.isUserLoggedIn;
  isShownCreateProjectDialog = false;
  isLightTheme = this.themeService.isLightTeam;

  ngOnInit(): void {
    this.items = [
      { label: 'Join Projects', routerLink: 'projects' },
      {
        label: 'Create Project',
        command: () => {
          this.isShownCreateProjectDialog = true;
        },
      },
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
