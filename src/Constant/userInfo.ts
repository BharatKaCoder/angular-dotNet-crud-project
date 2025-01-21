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

export interface teamInfo {
    result : {
        Id: number
        TeamName: string
        Flag:string
        Champions:string
        Captain:string
    }
  }

export interface playerData {
    Id: number,
    PlayerName: string,
	Role: string,
	Matches: number,
	HighestScore: number,
    Wickets: number,
    TeamId: number,
}