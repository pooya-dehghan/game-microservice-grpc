export enum Role {
  Admin = 'admin',
  Player = 'player',
}

type User = {
  id: string;
  userName: string;
  password: string;
  role: Role;
};


export interface IAuthentication {
  readonly user: User;
  readonly token : string
}