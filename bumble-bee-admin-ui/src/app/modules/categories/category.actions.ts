import { Category } from "../../entity/entity";

export class AddCategory {
  static readonly type = '[Category] Add';

  constructor(public payload: Category) {
  }
}

export class UpdateCategory {
  static readonly type = '[Category] Edit';

  constructor(public payload: Category) {
  }
}

export class FetchAllCategories {
  static readonly type = '[Category] Fetch All';
}

export class DeleteCategory {
  static readonly type = '[Category] Delete';

  constructor(public id: any) {
  }
}

export class FetchCategoryById {
  static readonly type = '[Category] Fetch By Id';

  constructor(public id: any) {
  }
}

export class FailedCategoryAction {
  static readonly type = '[Category] Failed';

  constructor(public type: string, public error?: any) {
  }
}
