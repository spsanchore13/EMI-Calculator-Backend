const jwt = require('jsonwebtoken');

const authentiation = (req, res, next) => {
    // console.log(req.headers)
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.send("please sign in");
    }
    else {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            const userId = decoded.id;
            // console.log(decoded)
            if (err) {
                res.send({ "message": "something went wrong" });
            }
            if (decoded) {
                req.body.userId = userId
                next();
            }
            else {
                res.send({ "message": "please login to continue" });
            }
        });
    }

}


module.exports = { authentiation }