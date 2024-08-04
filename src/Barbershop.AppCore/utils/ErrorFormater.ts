import { Result } from "express-validator";


export default class ErrorFormater{
    public static ExpressValidator(errors: Result):{"errors": {[path:string]:string[]}}{
        let result:{[path:string]:string[]} = {}
        errors.array().forEach(error =>{
            if(!result[error['path'] as string]){
                result[error['path'] as string] = []
            }
            result[error['path'] as string] = [...result[error['path'] as string], error['msg']]
        })
        return {"errors": result}
    }
}