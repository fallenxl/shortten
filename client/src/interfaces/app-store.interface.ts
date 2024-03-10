import { IUrl, IUrlState, IUser } from ".";

export interface IAppStore {
  user: IUser | null;
  url: IUrlState;
}
