const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../Model/user.model')

const Register = async (req, res) => {
    // console.log(req.body)
    const { name, email, password } = req.body;

    const isExist = await UserModel.findOne({ email: email });

    if (isExist) {
        res.send({ "message": "user already exists" })
    } else {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).send({ "message": "something wnt wrong ,please try again later!" })
            }
            const newUser = new UserModel({ name, email, password: hash })
            await newUser.save()
            res.send({ "message": "user registered successfully" })
        })

    }
}

const Login = async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body
    const isExist = await UserModel.findOne({ email })

    if (!isExist) {
        res.send({ "message": "user not found" })
    } else {
        const id = isExist._id
        // console.log(isExist)
        const hashedPassword = isExist.password
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) res.send({ "message": "password not match" })

            if (result) {
                const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
                res.send({ "message": "login successful", token })
            }
        })
    }

}

const Profile = async (req, res) => {
    const { userId } = req.body;
    const user = await UserModel.findOne({ _id: userId })
    res.send({ name: user.name, email: user.email })
}


const userOperations = { Register, Login, Profile }

module.exports = { userOperations }