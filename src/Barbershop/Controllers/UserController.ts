import { Request, Response } from 'express'
import { controller, httpGet } from 'inversify-express-utils'
import { inject } from 'inversify'
import IUserService from '../../Barbershop.AppCore/Interfaces/IUserService'

@controller('/user')
export default class UserController{
    private userService:IUserService

    constructor(@inject('IUserService') userService : IUserService){
        this.userService = userService
    }

    @httpGet('/')
    public async getAll(_req:Request, res:Response){
        const users = await this.userService.GetAll()
        return res.status(200).json(users)
    }
}