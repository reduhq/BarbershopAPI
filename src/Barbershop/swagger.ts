import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import express from 'express'
import settings from './Settings'

// Metadata info about our API
const options = {
    definition:{
        openapi:'3.0.0',
        info:{
            title: 'Barbershop API',
            version: '1.0.0'
        }
    },
    apis:[
        './Controllers/*.ts'
    ]
}

// Docs en JSON format
const swaggerSpec = swaggerJSDoc(options)

// Function to setup our docs
const swaggerDocs = (app:express.Application) =>{
    app.use(`${settings.API_V1_STR}/docs`, swaggerUI.serve, swaggerUI.setup(swaggerSpec))
    console.log(`📓 Version 1 Docs are available at ${settings.SERVER_HOST}${settings.API_V1_STR}/docs`)
}

export default swaggerDocs