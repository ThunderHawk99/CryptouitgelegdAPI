import { TokenDTO } from './dto/tokenDTO';
import { User } from 'src/app/data/models/user';
import { Token } from './token';

export class UserToken{
    token: Token
    user: User

    constructor(tokenResponse: TokenDTO){
        this.token = new Token(tokenResponse.access_token, tokenResponse.refresh_token)
        this.user = new User(tokenResponse.name)
    }
}
