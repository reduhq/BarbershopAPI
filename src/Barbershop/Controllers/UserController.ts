import { Request, Response } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { inject } from 'inversify'
import IUserService from '../../Barbershop.AppCore/Interfaces/IUserService'
import ValidationMiddleware from '../Middlewares/ValidationMiddleware'
import UserCreateDTO from '../../Barbershop.AppCore/DTO/UserDTO/UserCreateDTO'

@controller('/user')
export default class UserController{
    private userService:IUserService

    constructor(@inject('IUserService') userService : IUserService){
        this.userService = userService
    }

    @httpPost('/', ValidationMiddleware.body(UserCreateDTO))
    public async create(req:Request, res:Response){
        const newUser = this.userService.Create(req.body)
        return res.status(200).json(newUser)
    }

    @httpGet('/')
    public async getAll(_req:Request, res:Response){
        const users = await this.userService.GetAll()
        return res.status(200).json(users)
    }
}