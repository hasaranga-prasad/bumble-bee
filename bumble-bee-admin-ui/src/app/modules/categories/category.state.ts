import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Category } from "../../entity/entity";
import {
  AddCategory,
  CategoryActionFailed,
  DeleteCategory,
  FetchAllCategories,
  UpdateCategory,
} from "./category.actions";
import { catchError, mergeMap, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { CategoryService } from "./services/category.service";


export interface CategoryStateModel {
  entities: Category[];
  error?: any;

}

@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class CategoryState {

  constructor(private categoryService: CategoryService, private toastr: ToastrService) {
  }

  @Action(AddCategory)
  addCategory(context: StateContext<CategoryStateModel>, action: AddCategory) {
    return this.categoryService.createEntity(action.payload)
      .pipe(
        tap((Category: Category) => {
          const state = context.getState();
          context.patchState({
            entities: [...state.entities, Category],
          });
          this.toastr.success('New Category entity created.', 'Success!');
        }),
        mergeMap(() => context.dispatch(new FetchAllCategories())),
        catchError(error => context.dispatch(new CategoryActionFailed(AddCategory.type, error))),
      );
  }

  @Action(UpdateCategory)
  updateCategory(context: StateContext<CategoryStateModel>, action: UpdateCategory) {
    return this.categoryService.updateEntity(action.payload?.id, action.payload)
      .pipe(
        tap((Category: Category) => {
          const state = context.getState();
          context.patchState({
            entities: [...state.entities, Category],
          });
          this.toastr.success('Category entity updated.', 'Success!');
        }),
        mergeMap(() => context.dispatch(new FetchAllCategories())),
        catchError(error => context.dispatch(new CategoryActionFailed(UpdateCategory.type, error))),
      );
  }

  @Action(FetchAllCategories)
  fetchAllCategories(context: StateContext<CategoryStateModel>) {
    return this.categoryService.findAllEntities()
      .pipe(
        tap((Categorys: Category[]) => {
          context.patchState({
            entities: [...Categorys],
          });
        }),
        catchError(error => context.dispatch(new CategoryActionFailed(FetchAllCategories.type, error))),
      );
  }

  @Action(CategoryActionFailed)
  failedCategoryAction(context: StateContext<CategoryStateModel>, action: CategoryActionFailed) {
    context.patchState({
      error: action.error,
    });
    this.toastr.error('Category entity action failed.', 'Error!');
  }

  @Action(DeleteCategory)
  deleteCategory(context: StateContext<CategoryStateModel>, action: DeleteCategory) {
    return this.categoryService.deleteEntity(action.id)
      .pipe(
        tap(() => {
          const state = context.getState();
          context.patchState({
            entities: state.entities.filter(Category => Category.id !== action.id),
          });
          this.toastr.success('Category entity deleted.', 'Success!');
        }),
        mergeMap(() => context.dispatch(new FetchAllCategories())),
        catchError(error => context.dispatch(new CategoryActionFailed(DeleteCategory.type, error))),
      );
  }
}



