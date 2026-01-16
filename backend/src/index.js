import express from 'express'
import cors from 'cors'
import { config } from '../config/.env.config.js'
import intiDB from './db/initDB.js'

const app = express()

app.use(cors())
app.use(express.json())

intiDB()

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
})
