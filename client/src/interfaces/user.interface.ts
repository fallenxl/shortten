export interface IUser {
    email: string;
    name: string;
    avatar: string;
}

export interface IUserState {
    isLoading: boolean;
    isErrored: boolean;
    data: IUser | null;
}