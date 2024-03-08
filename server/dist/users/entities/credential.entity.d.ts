import { ICredential } from 'src/interfaces';
export declare class CredentialsEntity implements ICredential {
    providerID: string;
    providerKey: string;
    userID: string;
}
