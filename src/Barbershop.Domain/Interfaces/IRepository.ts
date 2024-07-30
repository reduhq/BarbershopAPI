
export default interface IRepository<T>{
    Create(t:T): Promise<T>
    Update(t:T): Promise<T>
    Delete(t:T): Promise<Boolean>
    GetAll(): Promise<Array<T>>
}