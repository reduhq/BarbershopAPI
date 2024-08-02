import { Request, Response } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { inject } from 'inversify'
import IUserService from '../../Barbershop.AppCore/Interfaces/IUserService'
import ValidationMiddleware from '../Middlewares/ValidationMiddleware'
import UserCreateDTO from '../../Barbershop.AppCore/DTO/UserDTO/UserCreateDTO'
import UserDTO from '../../Barbershop.AppCore/DTO/UserDTO/UserDTO'

@controller('/user')
export default class UserController{
    private userService:IUserService

    constructor(@inject('IUserService') userService : IUserService){
        this.userService = userService
    }

    @httpPost('/', ValidationMiddleware.body(UserCreateDTO))
    public async create(req:Request, res:Response): Promise<Response<UserDTO>>{
        const user:UserCreateDTO = req.body
        // Validating if the username is available
        const userDB = await this.userService.GetByUsername(user.username)
        if(userDB){
            return res.status(409).json("El username ya esta en uso")
        }
        // Creating a new User
        const newUser = await this.userService.Create(user)
        // Returning the UserDTO
        const response = new UserDTO(
            newUser.id,
            newUser.username
        )
        return res.status(200).json(response)
    }

    @httpGet('/')
    public async getAll(_req:Request, res:Response){
        // Getting all the Users
        const users = await this.userService.GetAll()

        // Returning a list of UserDTO
        const response = users.map(user => new UserDTO(user.id, user.username))
        return res.status(200).json(response)
    }
}