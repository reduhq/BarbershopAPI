import { PrismaClient } from "@prisma/client";
import User from "../../Barbershop.Domain/Entities/User";
import IUserRepository from "../../Barbershop.Domain/Interfaces/IUserRepository";
import { BarbershopContext } from "../../Barbershop.Domain/BarbershopContext";
import { injectable } from "inversify";

@injectable()
export default class UserRepository implements IUserRepository{
    private context: PrismaClient

    constructor(){
        this.context = BarbershopContext
    }

    Create(_t: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    Update(_t: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    Delete(_t: User): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    public async GetAll(): Promise<User[]> {
        const usersResponse =  await this.context.user.findMany()
        const users:Array<User> = []
        usersResponse.map(user =>{
            users.push(new User(user.id, user.username, user.password
            ))
        })
        
        return users
    }

}