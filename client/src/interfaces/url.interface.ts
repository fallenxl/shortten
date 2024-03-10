export interface IUrlState {
  urls: IUrl[];
  isLoading: boolean;
  isError: string | null;
}
export interface IUrl {
  id: string;
  userID: string | null;
  originalURL: string;
  shortURL: string;
  clicks: number;
  expiresAt: string | null;
  createdAt: string;

}

export interface ICreateURL{
  originalURL: string;
  slug: string 
}
