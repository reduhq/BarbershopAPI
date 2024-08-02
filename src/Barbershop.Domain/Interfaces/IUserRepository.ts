import UserCreateDTO from "../../Barbershop.AppCore/DTO/UserDTO/UserCreateDTO";
import UserUpdateDTO from "../../Barbershop.AppCore/DTO/UserDTO/UserUpdateDTO";
import User from "../Entities/User";
import IRepository from "./IRepository";

export default interface IUserRepository extends IRepository<User, UserCreateDTO, UserUpdateDTO>{
    GetByUsername(username:string): Promise<User>
}