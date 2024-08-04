import crypto from 'crypto'

class Settings{
    public readonly SECRET_KEY = crypto.randomBytes(32).toString('hex')
    public readonly ACCESS_TOKEN_EXPIRES_MINUTES:number = 60 * 5
    public readonly ALGORITHM:string = "HS256"
}

const settings = new Settings()

export default settings