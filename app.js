import express from 'express';
import mongoose from 'mongoose'
import router from './routes/Notes-routes';
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json());
app.use('/api/notes',router)

mongoose.connect('mongodb+srv://admin:FnPhKv21JzVh8acw@cluster0.awjio1f.mongodb.net/?retryWrites=true&w=majority')
.then(()=>app.listen(5000))
.then(()=>console.log('connected to database and localhost 5000 '))
.catch((err)=>console.log(err))


//FnPhKv21JzVh8acw