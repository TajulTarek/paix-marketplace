import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from './model/user.model.js'; // Importing the model
import userRoutes from './route/user.route.js'; // Importing routes
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000
const URI = process.env.MongoDBURI
//connect mongodb with try catch block
try {
    mongoose.connect(URI, {
    })
    console.log('MongoDB Connected')
}
catch (error) {
    console.log('Error:', error)
}

app.use("/auth", userRoutes); // Using the routes



 
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})