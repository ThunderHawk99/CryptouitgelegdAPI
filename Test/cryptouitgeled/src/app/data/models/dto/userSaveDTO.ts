export class UserSaveDTO{
    username: string
    name: string
    email: string
    password: string

    constructor(username: string, voornaam: string, naam: string, email: string, password: string){
        this.username = username
        this.name = voornaam + " " + naam
        this.email = email
        this.password = password
    }
}