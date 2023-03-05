import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";


@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class CategoriesModule { }
