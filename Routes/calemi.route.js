const { Router } = require('express');
const { emiController } = require('../Controllers/emiCal.controller')

const calculateEMI = Router()

calculateEMI.post("/", emiController.emi)

module.exports = {
    calculateEMI
}