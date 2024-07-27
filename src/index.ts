import express from 'express'

const app = express()

app.use(express.json())

const PORT = 8000

app.get('/', (_req, res)=>{
    res.json("hola")
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})