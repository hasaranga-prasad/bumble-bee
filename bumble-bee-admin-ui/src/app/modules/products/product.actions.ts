import { Product } from "../../entity/entity";


export class AddProduct {
  static readonly type = '[Product] Add';

  constructor(public payload: Product) {
  }
}

export class UpdateProduct {
  static readonly type = '[Product] Edit';

  constructor(public payload: Product) {
  }
}

export class FetchAllProducts {
  static readonly type = '[Product] Fetch All';
}

export class DeleteProduct {
  static readonly type = '[Product] Delete';

  constructor(public id: any) {
  }
}

export class FetchProductById {
  static readonly type = '[Product] Fetch By Id';

  constructor(public id: any) {
  }
}

export class ProductActionFailed {
  static readonly type = '[Product] Failed';

  constructor(public type: string, public error?: any) {
  }
}
