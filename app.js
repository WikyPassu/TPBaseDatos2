const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/db');

// Init DB
db.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('MongoDB Conectado');
})

// Cors config
const corsOptions = {
    origin: "*"
};

// Init express app
const app = express();

// Middleware for logged requests in console
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Routes
app.use('/', require('./routes/index'));
app.use('/ticket', require('./routes/ticket'));
app.use('/cliente', require('./routes/cliente'));
app.use('/empleado', require('./routes/empleado'));
app.use('/sucursal', require('./routes/sucursal'));

// Port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App activa en el puerto ${port}`));