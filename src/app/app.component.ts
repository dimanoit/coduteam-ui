import { Component } from '@angular/core';
import {NavbarComponent} from "./core/components/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {SmallFooterComponent} from "./core/components/small-footer/small-footer.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        NavbarComponent,
        RouterOutlet,
        SmallFooterComponent
    ],
    standalone: true
})
export class AppComponent {
  title = 'my-first-project';
}
