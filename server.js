const express = require('express');
const { connection } = require('./Config/db')
require('dotenv').config()
const cors = require('cors');
const { routeUser } = require('./Routes/user.route')
const { calculateEMI } = require('./Routes/calemi.route')
const app = express();
const PORT = process.env.PORT || 8080;
const { authentiation } = require('./Middleware/auth.middleware')
app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
    res.send("Hello")
})

app.use("/auth", routeUser)
app.use("/calculateEMI", authentiation, calculateEMI)


app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`connected to port mongo database`);
    }
    catch (err) {
        console.log(err);
    }
    console.log(`listen on port ${PORT}`)
})