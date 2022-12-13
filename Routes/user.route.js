const { Router } = require('express');
const { userOperations } = require('../Controllers/user.controller')
const routeUser = Router()


routeUser.post("/register", userOperations.Register)
routeUser.post("/login", userOperations.Login)

module.exports = { routeUser }