import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './components/product/product.component';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";


@NgModule({
  declarations: [
    ProductComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
  ]
})
export class ProductsModule {
}
