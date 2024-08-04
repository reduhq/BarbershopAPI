import { Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import IUserService from "../../Barbershop.AppCore/Interfaces/IUserService";
import { inject } from "inversify";
import { body, Result, validationResult } from "express-validator";
import ErrorFormater from "../../Barbershop.AppCore/utils/ErrorFormater";


@controller('')
export default class LoginController{
    private userService: IUserService

    constructor(@inject('IUserService') userService:IUserService){
        this.userService = userService
    }

    @httpPost('/login/access-token',
        body('username').isString().withMessage('El username deberia ser un string').notEmpty().withMessage('El username no puede estar vacio'),
        body('password').isString().withMessage('La contraseña deberia ser un string').notEmpty().withMessage('La contraseña no puede estar vacia')
    )
    public async LoginAccessToken(req:Request, res:Response): Promise<Response>{
        // Validating the request body
        const errors:Result = validationResult(req)
        if(!errors.isEmpty()){
            // Validation error: 422
            return res.status(422).json(ErrorFormater.ExpressValidator(errors))
        }
        //
        const {username, password} = req.body
        // Validating the username and password
        const user = await this.userService.Authenticate(username, password)
        if(!user){
            return res.status(400).json('Credenciales invalidas')
        }
        // Create a JWT
        return res.status(200).json("")
    }
}