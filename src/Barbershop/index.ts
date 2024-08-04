import "reflect-metadata";
import express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './inversify.config'

import './Controllers/UserController'
import './Controllers/LoginController'

const PORT = 8000

const server = new InversifyExpressServer(container)

server.setConfig(app =>{
    app.use(express.json())
})

const app = server.build()

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})