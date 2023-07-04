import { Role } from './../role';
export interface UserDTO {
    email: string;
    name: string;
    username: string;
    roles: Role[];
}