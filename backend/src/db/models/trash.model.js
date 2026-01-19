import mongoose, { Schema } from 'mongoose'
import { Board } from './board.model'

const trashSchema = new Schema ({
    // take userId from session storage
    boardId: {
        type : [Schema.Types.ObjectId],
        ref : Board 
    }
    
}, {timestamps: false})

export const Trash = mongoose.model('Trash', trashSchema)


// ===================== Not to be implemented right now **Jan 19** ========================