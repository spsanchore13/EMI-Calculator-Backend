const { Router } = require('express');
const { userOperations } = require('../Controllers/user.controller')
const routeUser = Router()

const { authentiation } = require('../Middleware/auth.middleware')
routeUser.post("/register", userOperations.Register)
routeUser.post("/login", userOperations.Login)
routeUser.get("/profile", authentiation, userOperations.Profile)

module.exports = { routeUser }