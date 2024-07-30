import { PrismaClient } from "@prisma/client";
import User from "../../Barbershop.Domain/Entities/User";
import IUserRepository from "../../Barbershop.Domain/Interfaces/IUserRepository";
import { BarbershopContext } from "../../Barbershop.Domain/BarbershopContext";
import { injectable } from "inversify";
import { plainToInstance } from "class-transformer";
import UserCreateDTO from "../../Barbershop.AppCore/DTO/UserDTO/UserCreateDTO";

@injectable()
export default class UserRepository implements IUserRepository{
    private context: PrismaClient

    constructor(){
        this.context = BarbershopContext
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

    Update(_t: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    Delete(_t: User): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    public async GetAll(): Promise<User[]> {
        const usersResponse =  await this.context.user.findMany()
        return plainToInstance(User, usersResponse)
    }

}