import { IsString } from "class-validator";

export class AuthCreateDTO{
    @IsString()
    username: string;
    @IsString()
    password: string;
}