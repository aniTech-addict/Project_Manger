/* global global, process */

import { MongoMemoryServer } from 'mongodb-memory-server'

export default async function globalSetup() {
    const instance = await MongoMemoryServer.create({
        binary:{
            version: "8.0.0"
        }
    });
    global._MONGOINSTANCE = instance
    process.env.MONGODB_URI = instance.getUri()

}