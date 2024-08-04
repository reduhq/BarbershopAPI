import { Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import IUserService from "../../Barbershop.AppCore/Interfaces/IUserService";
import { inject } from "inversify";
import { body } from "express-validator";
import Security from "../../Barbershop.AppCore/utils/Security";
import settings from "../../Barbershop.AppCore/Settings";
import ValidationMiddleware from "../Middlewares/ValidationMiddleware";


@controller('')
export default class LoginController{
    private userService: IUserService

    constructor(@inject('IUserService') userService:IUserService){
        this.userService = userService
    }

    @httpPost('/login/access-token',
        body('username').isString().withMessage('El username deberia ser un string').notEmpty().withMessage('El username no puede estar vacio'),
        body('password').isString().withMessage('La contraseña deberia ser un string').notEmpty().withMessage('La contraseña no puede estar vacia'),
        ValidationMiddleware.validate()
    )
    public async LoginAccessToken(req:Request, res:Response): Promise<Response>{
        const {username, password} = req.body
        // Validating the username and password
        const user = await this.userService.Authenticate(username, password)
        if(!user){
            return res.status(400).json('Credenciales invalidas')
        }
        return res.status(200).json({
            "access_token": Security.CreateJWT(user.id, settings.ACCESS_TOKEN_EXPIRES_MINUTES),
            "token_type": "bearer"
        })
    }
}