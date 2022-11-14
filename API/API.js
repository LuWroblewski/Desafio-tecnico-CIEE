const express = require('express');
const app = express()
const cors = require('cors')
const nodemailer = require("nodemailer");



// get the client
const mysql = require('mysql2');
// create the connection to database
function conexão() {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'crud_ciee',
    });
    console.log('conectou!');

    return connection;
}
const connection = conexão()
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "testeluwroblewski@gmail.com",
        pass: "jdojzlkhzanwrpuh",
    }
})

module.exports = { connection, transporter }


app.use(cors())
app.use(express.json())

const clientRoute = require('../clientRoute.js')

app.use('/cliente', clientRoute)


//rota inicial
app.get('/', (req, res) => {

    res.json({ message: 'Oi express!' })

})
app.listen(3000, () => {
    console.log(`Server is up and running on 3000 ...`);
});








