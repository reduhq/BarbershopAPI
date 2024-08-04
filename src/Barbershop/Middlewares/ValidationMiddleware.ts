import { Request, Response, NextFunction } from "express"
import {plainToClass} from 'class-transformer'
import { validate, ValidationError } from "class-validator"

export default class ValidationMiddleware{
    public static body<T extends object>(dto:new()=>T){
        return (req:Request, res:Response, next:NextFunction)=>{
            const modelDTO = plainToClass(dto, req.body, {excludeExtraneousValues: true})

            validate(modelDTO).then((errors:ValidationError[]) =>{
                if(errors.length > 0){
                    // Validation Error : 422
                    return res.status(422).json(this.ShowErrors(errors))
                }
                req.body = modelDTO
                return next()
            })
        }
    }

    private static ShowErrors(errors:ValidationError[]){
        const result:{[property:string]:string[]} = {}
        errors.forEach(error =>{
            result[error.property] = Object.values(error.constraints!)
        })
        return {"errors":result}
    }
}