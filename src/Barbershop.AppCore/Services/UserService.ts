import { inject, injectable } from "inversify";
import User from "../../Barbershop.Domain/Entities/User";
import IUserRepository from "../../Barbershop.Domain/Interfaces/IUserRepository";
import IUserService from "../Interfaces/IUserService";
import UserCreateDTO from "../DTO/UserDTO/UserCreateDTO";
import UserUpdateDTO from "../DTO/UserDTO/UserUpdateDTO";
import Security from "../utils/Security";

@injectable()
export default class UserService implements IUserService{
    private userRepository:IUserRepository

    constructor(@inject('IUserRepository') userRepository: IUserRepository){
        this.userRepository = userRepository
    }
    public async Authenticate(username: string, password: string): Promise<User|null> {
        const user = await this.userRepository.GetByUsername(username)
        if(!user){
            return null
        }
        // Validating the password
        const validPassword = await Security.ValidatePassword(password, user.password)
        if(!validPassword){
            return null
        }
        return user
    }
    public async GetByUsername(username: string): Promise<User> {
        return await this.userRepository.GetByUsername(username)
    }
    public async Create(t: UserCreateDTO): Promise<User> {
        t.password = await Security.HashPassword(t.password)
        return await this.userRepository.Create(t)
    }
    public async Update(t: UserUpdateDTO): Promise<User> {
        return await this.userRepository.Update(t)
    }
    public async Delete(id: number): Promise<Boolean> {
        return await this.userRepository.Delete(id)
    }
    public async GetAll(): Promise<User[]> {
        return await this.userRepository.GetAll()
    }

}