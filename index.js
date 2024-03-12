import express from 'express'
import ConnectDB from './db.js'
import { Usermodel } from './db.js'
import bcrypt from "bcrypt"
import { jwtSign } from './jwtService.js'
import authmiddleware from './authmiddleware.js'
ConnectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.post("/signup", async(req, res) => {
    try {
        const { email, password,name,userName } = req.body
    const user = await Usermodel.findOne({ email })
    if (user) {
        res.send({status:400,data:"User already exists"})
    } else {
        const saltRounds = 10
        const salt=await bcrypt.genSalt(saltRounds)
        const hashedPass = await bcrypt.hash(password,salt);
        await Usermodel.create({ email, password: hashedPass, name, userName });
        res.send({status:201,data:"User registered"})
    }
    } catch (error) {
     console.log(error);   
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password);
        const user = await Usermodel.findOne({ email });
        console.log(user);

        if (!user) {
            return res.status(404).send({ status: 404, data: "User does not exist" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({ status: 401, data: "Password doesn't match" });
        }

        const token = jwtSign(user.id);
        res.status(200).send({ status: 200, data: "Login success", token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 500, data: "Internal server error" });
    }
});


app.get("/",authmiddleware, async(req, res) => {
    const user = await Usermodel.findById(req.userId)
    res.send({status:200,data:user})
})



app.listen(3000, () => console.log("Server connected"))
