export interface IUserRegistration {   
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