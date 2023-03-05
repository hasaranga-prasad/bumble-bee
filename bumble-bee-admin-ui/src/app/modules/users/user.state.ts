import { User } from "../../entity/entity";
import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, mergeMap, tap } from "rxjs";
import { UserService } from "./services/user.service";
import { AddUser, DeleteUser, FetchAllUsers, UpdateUser, UserActionFailed } from "./user.actions";

export interface UsersStateModel {
  entities: User[];
  error?: any;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class UserState {

  constructor(private service: UserService, private toastr: ToastrService) {
  }

  @Action(AddUser)
  addUser(context: StateContext<UsersStateModel>, action: AddUser) {
    return this.service.createEntity(action.payload)
      .pipe(
        tap((User: User) => {
          const state = context.getState();
          context.patchState({
            entities: [...state.entities, User],
          });
          this.toastr.success('New User entity created.', 'Success!');
        }),
        mergeMap(() => context.dispatch(new FetchAllUsers())),
        catchError(error => context.dispatch(new UserActionFailed(AddUser.type, error))),
      );
  }

  @Action(UpdateUser)
  updateUser(context: StateContext<UsersStateModel>, action: UpdateUser) {
    return this.service.updateEntity(action.payload?.id, action.payload)
      .pipe(
        tap((User: User) => {
          const state = context.getState();
          context.patchState({
            entities: [...state.entities, User],
          });
          this.toastr.success('User entity updated.', 'Success!');
        }),
        mergeMap(() => context.dispatch(new FetchAllUsers())),
        catchError(error => context.dispatch(new UserActionFailed(UpdateUser.type, error))),
      );
  }

  @Action(FetchAllUsers)
  fetchAllUsers(context: StateContext<UsersStateModel>) {
    return this.service.findAllEntities()
      .pipe(
        tap((Users: User[]) => {
          context.patchState({
            entities: [...Users],
          });
        }),
        catchError(error => context.dispatch(new UserActionFailed(FetchAllUsers.type, error))),
      );
  }

  @Action(UserActionFailed)
  failedUserAction(context: StateContext<UsersStateModel>, action: UserActionFailed) {
    context.patchState({
      error: action.error,
    });
    this.toastr.error('User entity action failed.', 'Error!');
  }

  @Action(DeleteUser)
  deleteUser(context: StateContext<UsersStateModel>, action: DeleteUser) {
    return this.service.deleteEntity(action.id)
      .pipe(
        tap(() => {
          const state = context.getState();
          context.patchState({
            entities: state.entities.filter(User => User.id !== action.id),
          });
          this.toastr.success('User entity deleted.', 'Success!');
        }),
        mergeMap(() => context.dispatch(new FetchAllUsers())),
        catchError(error => context.dispatch(new UserActionFailed(DeleteUser.type, error))),
      );
  }
}
