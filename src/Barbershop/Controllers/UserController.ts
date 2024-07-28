import {BaseHttpController, controller, httpGet } from 'inversify-express-utils'
import { inject } from 'inversify'
import IUserService from '../../Barbershop.AppCore/Interfaces/IUserService'

@controller('/user')
export default class UserController extends BaseHttpController{
    private userService:IUserService

    constructor(@inject('IUserService') userService : IUserService){
        super()
        this.userService = userService
    }

    @httpGet('/')
    public async getAll(){
        const users = await this.userService.GetAll()
        return this.json(users, 200)
    }
}