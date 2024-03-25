import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
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
import { AvatarModule } from 'primeng/avatar';
import { Store } from '../../../store/store';

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
    AvatarModule,
  ],
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  private themeService = inject(ThemeService);
  private store = inject(Store);

  @Input() profileImg?: string;

  items: MenuItem[] | undefined;
  isLoggedIn = this.store.isLoggedIn;
  isLightTheme = this.themeService.isLightTeam;

  ngOnInit(): void {
    this.items = [
      { label: 'Projects', routerLink: 'projects' },

      { label: 'Positions', routerLink: 'positions' },
      { label: 'Messages', routerLink: 'chat' },
    ];
  }

  toggleTheme() {
    this.themeService.switchTheme();
  }

  logout() {
    this.store.logout();
    this.router.navigateByUrl('');
  }
}
