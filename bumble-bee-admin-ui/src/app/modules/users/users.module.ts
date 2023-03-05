import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";


@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
  ],
})
export class UsersModule {
}
