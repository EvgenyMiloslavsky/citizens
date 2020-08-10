/*export class User {
  id?: string;
  email?: string;
  password?: string;
  token?: string;
}*/

export class User{
  localId?: string;
  email?: string;
  displayName?: string;
  idToken?: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: number;
}
