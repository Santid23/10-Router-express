const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {Cliente, Habitacion, Reserva} = require('./schemas')
const registro = require('./router/registrar');
const checkIn = require('./router/checkin');
const checkOut = require('./router/checkout');
const habitacion = require('./router/habitacion');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/registro', registro);
app.use('/checkin', checkIn);
app.use('/checkout', checkOut);
app.use('/habitaciones', habitacion);


mongoose.connect('mongodb://127.0.0.1:27017/prueba')
    .then(console.log('🟢 MongoDB está conectado'))
    .catch(err => {
    console.log('🔴 MongoDB no conectado: ' + err)
});


app.listen(PORT, (e) =>{
    e
    ? console.error("Nos se ha podido conectar el servidor")
    : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
});