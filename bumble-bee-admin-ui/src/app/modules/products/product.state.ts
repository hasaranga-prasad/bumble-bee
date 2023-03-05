import { Product } from "../../entity/entity";
import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AddProduct, DeleteProduct, FetchAllProducts, ProductActionFailed, UpdateProduct } from "./product.actions";
import { catchError, mergeMap, tap } from "rxjs";
import { ProductService } from "./services/product.service";

export interface ProductStateModel {
  entities: Product[];
  error?: any;
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class ProductState {

  constructor(private service: ProductService, private toastr: ToastrService) {
  }

  @Action(AddProduct)
  addProduct(context: StateContext<ProductStateModel>, action: AddProduct) {
    return this.service.createEntity(action.payload)
      .pipe(
        tap((Product: Product) => {
          const state = context.getState();
          context.patchState({
            entities: [...state.entities, Product],
          });
          this.toastr.success('New Product entity created.', 'Success!');
        }),
        mergeMap(() => context.dispatch(new FetchAllProducts())),
        catchError(error => context.dispatch(new ProductActionFailed(AddProduct.type, error))),
      );
  }

  @Action(UpdateProduct)
  updateProduct(context: StateContext<ProductStateModel>, action: UpdateProduct) {
    return this.service.updateEntity(action.payload?.id, action.payload)
      .pipe(
        tap((Product: Product) => {
          const state = context.getState();
          context.patchState({
            entities: [...state.entities, Product],
          });
          this.toastr.success('Product entity updated.', 'Success!');
        }),
        mergeMap(() => context.dispatch(new FetchAllProducts())),
        catchError(error => context.dispatch(new ProductActionFailed(UpdateProduct.type, error))),
      );
  }

  @Action(FetchAllProducts)
  fetchAllProducts(context: StateContext<ProductStateModel>) {
    return this.service.findAllEntities()
      .pipe(
        tap((Products: Product[]) => {
          context.patchState({
            entities: [...Products],
          });
        }),
        catchError(error => context.dispatch(new ProductActionFailed(FetchAllProducts.type, error))),
      );
  }

  @Action(ProductActionFailed)
  failedProductAction(context: StateContext<ProductStateModel>, action: ProductActionFailed) {
    context.patchState({
      error: action.error,
    });
    this.toastr.error('Product entity action failed.', 'Error!');
  }

  @Action(DeleteProduct)
  deleteProduct(context: StateContext<ProductStateModel>, action: DeleteProduct) {
    return this.service.deleteEntity(action.id)
      .pipe(
        tap(() => {
          const state = context.getState();
          context.patchState({
            entities: state.entities.filter(Product => Product.id !== action.id),
          });
          this.toastr.success('Product entity deleted.', 'Success!');
        }),
        mergeMap(() => context.dispatch(new FetchAllProducts())),
        catchError(error => context.dispatch(new ProductActionFailed(DeleteProduct.type, error))),
      );
  }
}
