import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../../features/user/services/user.service';
import { Router } from '@angular/router';
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {
  CreateProjectDialogComponent
} from "../../../features/projects/components/create-project-dialog/create-project-dialog.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MenubarModule,
    ButtonModule,
    CreateProjectDialogComponent,
    NgIf
  ],
  standalone: true
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  isLoggedIn = false;
  isShownCreateProjectDialog = false;

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
      { label: 'Vacancies', routerLink: 'vacancies' },
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
