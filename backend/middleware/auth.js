
const jwt = require('jsonwebtoken')
const secretKey = "Cortex-Marketing-Pankaj"

let decodeToken = function (token) {

    //jwt.verify(token, secretOrPublicKey, [options, callback])

    return jwt.verify(token, secretKey, function (err, data) {
        if (err)
            return null
        else
            return data
    })
}

const authentication = function (req, res, next) {
    try {
        let bearerToken = req.headers.authorization

        if (!bearerToken) return res.status(400).send({ status: false, message: "Token must be present" })

        token = bearerToken.split(' ')[1]

        let verifyToken = decodeToken(token)

        if (!verifyToken)

            return res.status(401).send({ status: false, message: "Either token is Invalid or Expired !......." })


        req.decodedToken = verifyToken

        next()

    } catch (err) {

        return res.status(500).send({ error: err.message })
    }
}

module.exports = { authentication }