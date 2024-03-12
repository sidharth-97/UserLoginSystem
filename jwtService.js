import jwt from 'jsonwebtoken'


export const jwtSign = (data) => {
    const token = jwt.sign(data,"secret")
    console.log(token,"this is the token");
    return token
}

export const jwtVerify = ( data) => {
    const verify = jwt.verify(data,"secret")
    return verify
}

export const decodeJwt = (token) => {
    const data = jwt.decode(token)
    return data
}