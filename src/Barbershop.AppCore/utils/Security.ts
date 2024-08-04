import {compare, hash} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import settings from '../Settings'

export default class Security{
    // PASSWORD
    public static async HashPassword(password:string):Promise<string>{
        return await hash(password, 10)
    }

    public static async ValidatePassword(password:string, hash:string):Promise<boolean>{
        return await compare(password, hash)
    }

    // JWT
    public static CreateJWT(subject:string|number, expiresDelta:number|null = null){
        // Setting the expire time of the token
        let expire
        if(expiresDelta){
            expire = Math.floor(Date.now()/1000) + expiresDelta
        }else{
            expire = Math.floor(Date.now()/1000) + settings.ACCESS_TOKEN_EXPIRES_MINUTES
        }
        // Setting the payload
        const toEncode = {
            "exp": expire,
            "sub": subject.toString()
        }
        // Signing the Token
        const encodedJWT = sign(toEncode, settings.SECRET_KEY)
        return encodedJWT
    }
}