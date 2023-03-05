import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public readonly displayedColumns: string[] = ['id', 'name', 'description', 'edit', 'delete'];
  public dataSource = [];
}
