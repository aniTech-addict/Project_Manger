import mongoose from 'mongoose'
import { config } from '../../config/.env.config.js'

export const initDB = async () => {

    try{
        await mongoose.connect(config.MONGODB_URI)
    
        mongoose.connection.on('connected', () => console.log('connected'));

    } catch (err) {
        console.log(`Error occurred in db connection, ${err}`)
    }
    mongoose.connection.on('error', ()=>{
        console.log("Error Connecting to db")
    })
}
