import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AuthComponent } from './user/auth/auth.component';
import { SmallFooterComponent } from './core/components/small-footer/small-footer.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectCardComponent } from './projects/project-card/project-card.component';
import { CardModule } from 'primeng/card';
import { ProjectCategoryComponent } from './projects/project-card/project-category/project-category.component';
import { ProjectPageComponent } from './projects/project-page/project-page.component';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProjectDialogComponent } from './projects/create-project-dialog/create-project-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { VacancyComponent } from './vacancies/vacancy/vacancy.component';
import { VacancyFilterComponent } from './vacancies/vacancy-filter/vacancy-filter.component';

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
    MenubarModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    CardModule,
    DialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DropdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
