import mongoose from "mongoose";

export default async function ConnectDB(){
    try {
        await mongoose.connect("Connection string")
    } catch (error) {
        console.log(error);
    }
}

const Userschema = new mongoose.Schema({
    name: String,
    userName: String,
    password: String,
    email: {
        type: String,
        unique:true
    }  
})

export const Usermodel=mongoose.model("User",Userschema)