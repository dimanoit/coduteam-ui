import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  value: string = '';
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
