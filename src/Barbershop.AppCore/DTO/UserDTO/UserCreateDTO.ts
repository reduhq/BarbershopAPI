import { IsNotEmpty, IsString, MinLength } from "class-validator";

export default class UserCreateDTO{
    @IsString()
    @IsNotEmpty({message:"El username no puede estar vacio"})
    username:string = ''

    @IsString()
    @IsNotEmpty({message:"La contraseña no puede estar vacia"})
    @MinLength(8, {message:"La contraseña es muy corta"})
    password:string = ''
}