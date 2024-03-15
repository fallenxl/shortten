import {  IUrlState, IUser, IUserState } from ".";

export interface IAppStore {
  user: IUserState;
  url: IUrlState;
}
