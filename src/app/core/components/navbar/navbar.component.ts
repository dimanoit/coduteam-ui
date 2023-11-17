import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  isLoggedIn: boolean = false;
  isShownCreateProjectDialog: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.items = [
      { label: 'Join Projects', routerLink: 'projects' },
      {
        label: 'Create Project',
        command: () => {
          this.isShownCreateProjectDialog = true;
        },
      },
      { label: 'Vacancies' },
      { label: 'About' },
    ];

    this.userService.onUserLogin().subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('');
  }
}
