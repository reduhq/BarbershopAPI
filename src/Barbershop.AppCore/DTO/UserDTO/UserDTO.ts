import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class UserDTO{
    @IsNumber()
    @IsNotEmpty()
    public readonly id:number

    @IsString()
    @IsNotEmpty()
    public readonly username:string

    constructor(id:number, username:string){
        this.id = id
        this.username = username
    }
}