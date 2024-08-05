import "reflect-metadata";
import express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './inversify.config'

import './Controllers/v1/UserController'
import './Controllers/v1/LoginController'
import swaggerDocs from "./swagger";
import settings from "./Settings";

const PORT = settings.PORT

const server = new InversifyExpressServer(container)

server.setConfig(app =>{
    app.use(express.json())
})

const app = server.build()

app.listen(PORT, ()=>{
    console.log(`🚀 Server running on ${settings.SERVER_HOST}/api`)
    swaggerDocs(app)
})