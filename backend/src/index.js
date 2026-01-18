import express from 'express'
import cors from 'cors'
import { config } from '../config/.env.config.js'
import { intiDB } from './db/initDB.js'

import { boardRouter } from './routes/boards.route.js'
import { tasksRouter } from './routes/tasks.route.js'
import ApiError from './helpers/ApiError.helper.js'

await intiDB()
const app = express()

app.use(cors())
app.use(express.json())

// add userAuth middleware

app.use('/api/v1/boards', boardRouter)
app.use('/api/v1/tasks', tasksRouter)

app.use((err, req, res) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    } else {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
})
