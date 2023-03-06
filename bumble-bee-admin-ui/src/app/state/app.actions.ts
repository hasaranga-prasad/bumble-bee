export class ActionFailed {
  static readonly type = '[Root] Action Failed';

  constructor(public type: string, public error?: any) {
  }
}

export class ActionSuccess {
  static readonly type = '[Root] Action Success';

  constructor(public type: string, public payload?: any) {
  }
}

export class ShowErrorAlert {
  static readonly type = '[Root] Show Error';

  constructor(public message: string, public error?: any) {
  }
}

export class ShowSuccessAlert {
  static readonly type = '[Root] Show Success';

  constructor(public message: string, public payload?: any) {
  }
}
