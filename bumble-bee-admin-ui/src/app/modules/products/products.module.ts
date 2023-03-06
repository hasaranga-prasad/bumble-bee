import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './components/product/product.component';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";

import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { appInterceptorProviders } from "../../services/error.interseptor";


@NgModule({
  declarations: [
    ProductComponent,
    ProductDialogComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
  ],
  providers: [
    appInterceptorProviders,
  ],
})
export class ProductsModule {
}
