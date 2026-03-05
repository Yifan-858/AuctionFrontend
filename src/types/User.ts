export interface UserSignup {
  UserName: string;
  Email: string;
  Password: string;
}

export interface UserLogin {
  Email: string;
  Password: string;
}

export interface User {
  id: number;
  userName: string;
  email: string;
}
