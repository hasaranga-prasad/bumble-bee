import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  public readonly displayedColumns: string[] = ['id', 'name', 'description', 'edit', 'delete'];
  public dataSource = [];
}
