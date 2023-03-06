import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ActionFailed, ActionSuccess, ShowErrorAlert, ShowSuccessAlert } from "./app.actions";
import { ToastrService } from "ngx-toastr";


export interface AppStateModel {
  successAlertMessage?: string;
  errorAlertMessage?: string;
  error?: any;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {},
})
@Injectable()
export class AppState {

  constructor(private toastr: ToastrService) {
  }

  @Action(ActionFailed)
  actionFailed(context: StateContext<AppStateModel>, action: ActionFailed) {
    context.patchState({
      errorAlertMessage: action.error,
      error: action.error,
    });
  }

  @Action(ActionSuccess)
  actionSuccess(context: StateContext<AppStateModel>, action: ActionSuccess) {
    context.patchState({
      successAlertMessage: action.payload,
    });
  }

  @Action(ShowErrorAlert)
  showErrorAlert(context: StateContext<AppStateModel>, action: ShowErrorAlert) {
    context.patchState({
      errorAlertMessage: action.message,
      error: action.message,
    });
    this.toastr.success("Something went wrong", 'Error!');
    console.log('error', action.error);
  }

  @Action(ShowSuccessAlert)
  showSuccessAlert(context: StateContext<AppStateModel>, action: ShowSuccessAlert) {
    context.patchState({
      successAlertMessage: action.message,
    });
    this.toastr.success(action.message, 'Success!');
  }

}
