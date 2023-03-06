import { Component, OnDestroy, OnInit } from '@angular/core';
import { Brand } from "../../../../entity/entity";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { BrandDialogComponent, BrandDialogData } from "../brand-dialog/brand-dialog.component";
import { ConfirmationDialogComponent } from "../../../../components/confirmation-dialog/confirmation-dialog.component";
import { Store } from "@ngxs/store";
import { AddBrand, DeleteBrand, FetchAllBrands, UpdateBrand } from "../../brand.actions";

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit, OnDestroy {

  public readonly displayedColumns: string[] = ['id', 'name', 'description', 'edit', 'delete'];
  public dataSource: MatTableDataSource<Brand> = new MatTableDataSource<Brand>([]);

  private _brands: Observable<Brand[]>;

  private subscription?: Subscription;

  constructor(public dialog: MatDialog, private store: Store) {
    this._brands = this.store.select(state => state.brands.entities);
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchAllBrands());
    this.subscription = this._brands.subscribe((brands: Brand[]) => this.dataSource.data = brands);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  newBrand(): void {
    this.openDialog('create');
  }

  updateBrand(entity: Brand): void {
    this.openDialog('update', entity);
  }

  deleteBrand(entity: Brand): void {
    this.dialog.open(ConfirmationDialogComponent).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(new DeleteBrand(entity.id));
      }
    });
  }

  private openDialog(type: string, entity?: Brand): void {
    const dialogRef = this.dialog.open(BrandDialogComponent, {
      data: {
        type: type,
        entity: entity,
      },
    });

    dialogRef.afterClosed().subscribe((result: BrandDialogData) => {
      if (result && result.entity) {
        if (result.type === 'create') {
          this.store.dispatch(new AddBrand(result.entity));
        } else if (result.type === 'update') {
          this.store.dispatch(new UpdateBrand(result.entity));
        } else {
          console.log('unknown type ', result);
        }
      }
    });
  }
}
