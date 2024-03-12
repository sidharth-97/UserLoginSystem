import { decodeJwt, jwtVerify } from "./jwtService.js"
import { Usermodel } from "./db.js"

export default async function authmiddleware(req,res,next) {
    const check = jwtVerify(req.headers.authorization)
    if (check) {
        const id=decodeJwt(req.headers.authorization)
        const user = await Usermodel.findById(id)
        req.userId=user.id
        next()
    } else {
        res.send({status:401,data:"Not authorized"})
    }
}