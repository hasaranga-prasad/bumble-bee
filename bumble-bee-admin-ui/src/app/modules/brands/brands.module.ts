import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsComponent } from './components/brands/brands.component';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { HttpClientModule } from "@angular/common/http";
import { BrandDialogComponent } from './components/brand-dialog/brand-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    BrandsComponent,
    BrandDialogComponent,
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class BrandsModule {
}
