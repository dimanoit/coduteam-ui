import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    ButtonModule,
    DividerModule,
    InputTextModule,
    KeyFilterModule,
    ReactiveFormsModule,
    NgForOf
  ],
  standalone: true
})
export class FooterComponent {
  value = '';
  linkItems: LinkItem[] = [
    {
      header: 'About Us',
      items: ['Projects', 'Join Us', 'Contact', 'FAQ', 'Blog'],
    },
    {
      header: 'Terms',
      items: ['Privacy', 'Cookies', 'Sitemap', 'Support', 'Feedback'],
    },
    {
      header: 'Resources',
      items: ['Tutorials', 'Documentation', 'Community', 'Events', 'Partners'],
    },
  ];
}

interface LinkItem {
  header: string;
  items: string[];
}
