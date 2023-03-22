import mongoose, { Mongoose } from 'mongoose'

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    }
});


export default mongoose.model("Notes", noteSchema)
