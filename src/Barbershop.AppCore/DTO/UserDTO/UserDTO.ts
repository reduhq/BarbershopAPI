import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class UserDTO{
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    id:number = 0

    @Expose()
    @IsString()
    @IsNotEmpty()
    username:string = ''
}