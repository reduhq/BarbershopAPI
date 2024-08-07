import { PrismaClient } from "@prisma/client";
import User from "../../Barbershop.Domain/Entities/User";
import IUserRepository from "../../Barbershop.Domain/Interfaces/IUserRepository";
import { BarbershopContext } from "../../Barbershop.Domain/BarbershopContext";
import { injectable } from "inversify";
import { plainToInstance } from "class-transformer";
import UserCreateDTO from "../../Barbershop.AppCore/DTO/UserDTO/UserCreateDTO";
import UserUpdateDTO from "../../Barbershop.AppCore/DTO/UserDTO/UserUpdateDTO";

@injectable()
export default class UserRepository implements IUserRepository{
    private context: PrismaClient

    constructor(){
        this.context = BarbershopContext
    }
    public async GetByUsername(username: string): Promise<User> {
        const user = await this.context.user.findFirst({
            where:{
                username
            }
        })
        return plainToInstance(User, user)
    }
    public async Create(t: UserCreateDTO): Promise<User> {
        const userResponse = await this.context.user.create({
            data:{
                username: t.username,
                password: t.password
            }
        })
        return plainToInstance(User, userResponse)
    }
    Update(_t: UserUpdateDTO): Promise<User> {
        throw new Error("Method not implemented.");
    }
    Delete(_id: number): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    public async GetAll(): Promise<User[]> {
        const usersResponse =  await this.context.user.findMany()
        return plainToInstance(User, usersResponse)
    }

}