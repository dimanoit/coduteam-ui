import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AuthComponent } from './user/auth/auth.component';
import { SmallFooterComponent } from './small-footer/small-footer.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectCardComponent } from './projects/project-card/project-card.component';
import { CardModule } from 'primeng/card';
import { ProjectCategoryComponent } from './projects/project-card/project-category/project-category.component';
import { ProjectPageComponent } from './projects/project-page/project-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AuthComponent,
    SmallFooterComponent,
    ProjectsComponent,
    ProjectCardComponent,
    ProjectCategoryComponent,
    ProjectPageComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
