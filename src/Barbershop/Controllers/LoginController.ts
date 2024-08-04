import { Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
// import IUserService from "../../Barbershop.AppCore/Interfaces/IUserService";
// import { inject } from "inversify";
import { body, Result, validationResult } from "express-validator";
import ErrorFormater from "../../Barbershop.AppCore/utils/ErrorFormater";


@controller('')
export default class LoginController{
    // private userService: IUserService

    // constructor(@inject('IUserService') userService:IUserService){
    //     this.userService = userService
    // }

    @httpPost('/login/access-token',
        body('username').notEmpty().isString().withMessage('El username no puede estar vacio'),
        body('password').notEmpty().isString().withMessage('La contraseña no puede estar vacia')
    )
    public async LoginAccessToken(req:Request, res:Response): Promise<Response>{
        // Validating the request body
        const errors:Result = validationResult(req)
        if(!errors.isEmpty()){
            // Validation error: 422
            return res.status(422).json(ErrorFormater.ExpressValidator(errors))
        }
        //
        return res.status(200).json("")
    }
}