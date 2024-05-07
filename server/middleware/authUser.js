var jwt = require('jsonwebtoken');
const secretKey = 'iloveyou';

const authUser = (req, res, next) => {
    const token = req.header('authToken');
    // console.log("Received token:", token); // Debug: Check received token
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, secretKey);
        // console.log("Decoded token data:", data); //debuggg
        req.id = data.id;
        // console.log(data.id);  //debuggg
        // console.log(req.id);   //debuggg
        next();
    } catch (error) {
        console.error("Error decoding token:", error);
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

module.exports = authUser;