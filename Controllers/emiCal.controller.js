const emi = async (req, res) => {
    const { amount, intrestRate, tenure, userId } = req.body;

    const r = +(intrestRate / 12 / 100).toFixed(6)
    const emi = (amount * r * (Math.pow((1 + r), tenure)) / (Math.pow((1 + r), tenure) - 1)).toFixed(2)

    const interestPayble = emi * tenure - amount;
    res.send({ emi: emi, interestPayble, total: amount + interestPayble });
}

const emiController = { emi }
module.exports = { emiController }