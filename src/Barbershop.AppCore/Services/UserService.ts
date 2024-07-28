import { inject, injectable } from "inversify";
import User from "../../Barbershop.Domain/Entities/User";
import IUserRepository from "../../Barbershop.Domain/Interfaces/IUserRepository";
import IUserService from "../Interfaces/IUserService";

@injectable()
export default class UserService implements IUserService{
    private userRepository:IUserRepository

    constructor(@inject('IUserRepository') userRepository: IUserRepository){
        this.userRepository = userRepository
    }

    public async Create(t: User): Promise<User> {
        return await this.userRepository.Create(t)
    }
    public async Update(t: User): Promise<User> {
        return await this.userRepository.Update(t)
    }
    public async Delete(t: User): Promise<Boolean> {
        return await this.userRepository.Delete(t)
    }
    public async GetAll(): Promise<User[]> {
        return await this.userRepository.GetAll()
    }

}