import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HomeComponent } from './features/home/home.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { AuthComponent } from './features/user/auth/auth.component';
import { SmallFooterComponent } from './core/components/small-footer/small-footer.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ProjectCardComponent } from './features/projects/project-card/project-card.component';
import { ProjectCategoryComponent } from './features/projects/project-card/project-category/project-category.component';
import { ProjectPageComponent } from './features/projects/project-page/project-page.component';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProjectDialogComponent } from './features/projects/create-project-dialog/create-project-dialog.component';
import { VacanciesComponent } from './features/vacancies/vacancies.component';
import { VacancyComponent } from './features/vacancies/vacancy/vacancy.component';
import { VacancyFilterComponent } from './features/vacancies/vacancy-filter/vacancy-filter.component';
import {UiModule} from "./ui/ui.module";

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
    CreateProjectDialogComponent,
    VacanciesComponent,
    VacancyComponent,
    VacancyFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
