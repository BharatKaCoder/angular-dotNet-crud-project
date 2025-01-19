export interface IUserRegistration { 
    id: number  
    userName:string
    email: string
    role: string
    password: string
}

export interface IUserLogin  {   
    userName:string
    password: string
}

export interface UserSharedData {
    userName: string;
    isValidedUser: boolean;
}

export interface tableData {
    userName:string
    email: string
    role: string
}

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }