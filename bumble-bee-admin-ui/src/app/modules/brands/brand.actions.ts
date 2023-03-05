import { Brand } from "../../entity/entity";

export class AddBrand {
  static readonly type = '[Brand] Add';

  constructor(public payload: Brand) {
  }
}

export class UpdateBrand {
  static readonly type = '[Brand] Edit';

  constructor(public payload: Brand) {
  }
}

export class FetchAllBrands {
  static readonly type = '[Brand] Fetch All';
}

export class DeleteBrand {
  static readonly type = '[Brand] Delete';

  constructor(public id: any) {
  }
}

export class FetchBrandById {
  static readonly type = '[Brand] Fetch By Id';

  constructor(public id: any) {
  }
}

export class BrandActionFailed {
  static readonly type = '[Brand] Failed';

  constructor(public type: string, public error?: any) {
  }
}
