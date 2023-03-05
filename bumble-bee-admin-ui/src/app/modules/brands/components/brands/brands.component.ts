import { Component, OnDestroy, OnInit } from '@angular/core';
import { Brand } from "../../../../entity/entity";
import { BrandService } from "../../services/brand.service";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { BrandDialogComponent, BrandDialogData } from "../brand-dialog/brand-dialog.component";

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit, OnDestroy {

  public readonly displayedColumns: string[] = ['id', 'name', 'description', 'edit', 'delete'];
  public dataSource: MatTableDataSource<Brand> = new MatTableDataSource<Brand>([]);

  private subscription?: Subscription;

  constructor(private service: BrandService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscription = this.service.findAllEntities().subscribe((brands: Brand[]) => {
      this.dataSource.data = brands;
    });
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
          this.service.createEntity(result.entity).subscribe((brand: Brand) => {
            this.dataSource.data.push(brand);
            this.dataSource.data = this.dataSource.data.slice();
          });
        } else if (result.type === 'update') {
          console.log('update ', result)
          this.service.updateEntity(result.entity.id, result.entity).subscribe((brand: Brand) => {
            this.dataSource.data = this.dataSource.data.map((item: Brand) => {
              if (item.id === brand.id) {
                return brand;
              } else {
                return item;
              }
            });
          });
        } else {
          console.log('unknown type ', result);
        }
      }
    });
  }
}
