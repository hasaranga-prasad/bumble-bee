import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { Category } from "../../../../entity/entity";
import { ConfirmationDialogComponent } from "../../../../components/confirmation-dialog/confirmation-dialog.component";
import { CategoryDialogComponent, CategoryDialogData } from "../category-dialog/category-dialog.component";
import {
  AddCategory,
  DeleteCategory,
  FailedCategoryAction,
  FetchAllCategories,
  UpdateCategory,
} from "../../category.actions";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {

  public readonly displayedColumns: string[] = ['id', 'name', 'description', 'edit', 'delete'];
  public dataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>([]);
  private _categories: Observable<Category[]>;
  private _subscription?: Subscription;

  constructor(public dialog: MatDialog, private store: Store) {
    this._categories = this.store.select(state => state.categories.entities);
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchAllCategories());
    this._subscription = this._categories.subscribe((categories: Category[]) => this.dataSource.data = categories);
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe()
  }

  createEntity(): void {
    this.openDialog('create');
  }

  updateEntity(entity: Category): void {
    this.openDialog('update', entity);
  }

  deleteEntity(entity: Category): void {
    this.dialog.open(ConfirmationDialogComponent).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(new DeleteCategory(entity.id));
      }
    });
  }

  private openDialog(type: string, entity?: Category): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: {
        type: type,
        entity: entity,
      },
    });

    dialogRef.afterClosed().subscribe((result: CategoryDialogData) => {
      if (result && result.entity) {
        if (result.type === 'create') {
          this.store.dispatch(new AddCategory(result.entity));
        } else if (result.type === 'update') {
          this.store.dispatch(new UpdateCategory(result.entity));
        } else {
          this.store.dispatch(new FailedCategoryAction('Unknown error'));
        }
      }
    });
  }
}
