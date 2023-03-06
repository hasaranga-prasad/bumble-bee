import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "../../../../entity/entity";
import { ProductDialogComponent, ProductDialogData } from "../product-dialog/product-dialog.component";
import { DialogType } from "../../../../util/custom.types";
import { ConfirmationDialogComponent } from "../../../../components/confirmation-dialog/confirmation-dialog.component";
import { AddProduct, DeleteProduct, FetchAllProducts, ProductActionFailed, UpdateProduct } from "../../product.actions";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  public readonly displayedColumns: string[] = ['id', 'name', 'brand', 'category', 'edit', 'delete'];
  public dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);

  private _subscription?: Subscription;

  constructor(public dialog: MatDialog, private store: Store) {

  }

  ngOnInit(): void {
    this._subscription = this.store.select(state => state.products.entities)
      .subscribe((products: Product[]) => this.dataSource.data = products);
    // fetch all products
    this.store.dispatch(new FetchAllProducts());
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  createEntity(): void {
    this.openDialog(DialogType.CREATE);
  }

  updateEntity(entity: Product): void {
    this.openDialog(DialogType.UPDATE, entity);
  }

  deleteEntity(entity: Product): void {
    this.dialog.open(ConfirmationDialogComponent).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(new DeleteProduct(entity.id));
      }
    });
  }

  private openDialog(type: DialogType, entity?: Product): void {
    const matDialogRef = this.dialog.open(ProductDialogComponent, {
      data: {
        type: type,
        entity: entity,
      },
    });

    matDialogRef.afterClosed().subscribe((result: ProductDialogData) => {
      if (result && result.entity) {
        switch (result.type) {
          case DialogType.CREATE:
            this.store.dispatch(new AddProduct(result.entity));
            break;
          case DialogType.UPDATE:
            this.store.dispatch(new UpdateProduct(result.entity));
            break;
          default:
            this.store.dispatch(new ProductActionFailed(result.type));
            break;
        }
      }
    });
  }
}
