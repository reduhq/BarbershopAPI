
export default class User {
    private _id: number
    private _username: string
    private _password: string
    
    constructor(id: number, username: string, password: string) {
        this._id = id
        this._username = username
        this._password = password
    }

    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get username(): string {
        return this._username;
    }

    public set username(username: string) {
        this._username = username;
    }

    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }

} 