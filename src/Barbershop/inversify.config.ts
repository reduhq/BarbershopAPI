import { Container } from "inversify";
import IUserRepository from "../Barbershop.Domain/Interfaces/IUserRepository";
import UserRepository from "../Barbershop.Infraestructure/Repositories/UserRepository";
import IUserService from "../Barbershop.AppCore/Interfaces/IUserService";
import UserService from "../Barbershop.AppCore/Services/UserService";

const container = new Container()
container.bind<IUserRepository>('IUserRepository').to(UserRepository)
container.bind<IUserService>('IUserService').to(UserService)

export {container}