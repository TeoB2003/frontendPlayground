import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class LoginService{
    userName='Dummy User'
    login(user:string, password:string)
    {
        this.userName='Dummy User'
        return true
    }

    getUserName()
    {
        return this.userName
    }
}