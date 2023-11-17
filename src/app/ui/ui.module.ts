import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    CardModule,
    DialogModule,
    DropdownModule,
  ],
  exports:[
    CommonModule,
    MenubarModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    CardModule,
    DialogModule,
    DropdownModule,
  ]
})
export class UiModule { }
