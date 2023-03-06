import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from "@angular/common/http";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { NgxsModule } from "@ngxs/store";
import { BrandState } from "./modules/brands/brand.state";
import { ToastrModule } from "ngx-toastr";
import { CategoryState } from "./modules/categories/category.state";
import { ProductState } from "./modules/products/product.state";
import { UserState } from "./modules/users/user.state";
import { appInterceptorProviders } from "./services/error.interseptor";
import { AppState } from "./state/app.state";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NotFoundComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    NgxsModule.forRoot([
      AppState,
      BrandState,
      CategoryState,
      ProductState,
      UserState,
    ]),
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    appInterceptorProviders,
  ],
  bootstrap: [AppComponent],
  exports: [ConfirmationDialogComponent],
})
export class AppModule {
}
