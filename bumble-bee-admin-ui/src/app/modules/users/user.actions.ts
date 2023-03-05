import { User } from "../../entity/entity";

export class AddUser {
  static readonly type = '[User] Add';

  constructor(public payload: User) {
  }
}

export class UpdateUser {
  static readonly type = '[User] Edit';

  constructor(public payload: User) {
  }
}

export class FetchAllUsers {
  static readonly type = '[User] Fetch All';
}

export class DeleteUser {
  static readonly type = '[User] Delete';

  constructor(public id: any) {
  }
}

export class FetchUserById {
  static readonly type = '[User] Fetch By Id';

  constructor(public id: any) {
  }
}

export class UserActionFailed {
  static readonly type = '[User] Failed';

  constructor(public type: string, public error?: any) {
  }
}
