import mongoose, { Schema } from 'mongoose'

const boardSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxLen: 500
    },
    tags: {
        type: [String]
    }
},{timestamps:true})

export const Board = mongoose.model('Board', boardSchema)

