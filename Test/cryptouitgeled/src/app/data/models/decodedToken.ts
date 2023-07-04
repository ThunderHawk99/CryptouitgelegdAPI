import { Role } from './role';
export interface DecodedToken {
    exp: number
    iss: string
    roles: Role[]
    sub: string
}