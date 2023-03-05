import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { BrandService } from "./services/brand.service";
import { Brand } from "../../entity/entity";
import { AddBrand, BrandActionFailed, DeleteBrand, FetchAllBrands, UpdateBrand } from "./brand.actions";
import { catchError, mergeMap, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";


export interface BrandStateModel {
  entities: Brand[];
  error?: any;

}

@State<BrandStateModel>({
  name: 'brands',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class BrandState {

  constructor(private brandService: BrandService, private toastr: ToastrService) {
  }

  @Action(AddBrand)
  addBrand(context: StateContext<BrandStateModel>, action: AddBrand) {
    return this.brandService.createEntity(action.payload)
      .pipe(
        tap((brand: Brand) => {
          const state = context.getState();
          context.patchState({
            entities: [...state.entities, brand],
          });
          this.toastr.success('New brand entity created.', 'Success!');
        }),
        mergeMap(() => context.dispatch(new FetchAllBrands())),
        catchError(error => context.dispatch(new BrandActionFailed(AddBrand.type, error))),
      );
  }

  @Action(UpdateBrand)
  updateBrand(context: StateContext<BrandStateModel>, action: UpdateBrand) {
    return this.brandService.updateEntity(action.payload?.id, action.payload)
      .pipe(
        tap((brand: Brand) => {
          const state = context.getState();
          context.patchState({
            entities: [...state.entities, brand],
          });
          this.toastr.success('Brand entity updated.', 'Success!');
        }),
        mergeMap(() => context.dispatch(new FetchAllBrands())),
        catchError(error => context.dispatch(new BrandActionFailed(UpdateBrand.type, error))),
      );
  }

  @Action(FetchAllBrands)
  fetchAllBrands(context: StateContext<BrandStateModel>) {
    return this.brandService.findAllEntities()
      .pipe(
        tap((brands: Brand[]) => {
          context.patchState({
            entities: [...brands],
          });
        }),
        catchError(error => context.dispatch(new BrandActionFailed(FetchAllBrands.type, error))),
      );
  }

  @Action(BrandActionFailed)
  brandActionFailed(context: StateContext<BrandStateModel>, action: BrandActionFailed) {
    context.patchState({
      error: action.error,
    });
    this.toastr.error('Brand entity action failed.', 'Error!');
  }

  @Action(DeleteBrand)
  deleteBrand(context: StateContext<BrandStateModel>, action: DeleteBrand) {
    return this.brandService.deleteEntity(action.id)
      .pipe(
        tap(() => {
          const state = context.getState();
          context.patchState({
            entities: state.entities.filter(brand => brand.id !== action.id),
          });
          this.toastr.success('Brand entity deleted.', 'Success!');
        }),
        mergeMap(() => context.dispatch(new FetchAllBrands())),
        catchError(error => context.dispatch(new BrandActionFailed(DeleteBrand.type, error))),
      );
  }
}



