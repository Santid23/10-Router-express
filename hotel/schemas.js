const mongoose = require('mongoose');


// Clientes
const clienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Completa el nombre"]
    },
    apellido: {
        type: String,
        required: [true, "Completa el apellido"]
    },
    dni: {
        type: String,
        min: 8,
        required: true
    }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

// Habitaciones
const habitacionSchema =  mongoose.Schema({
    numero: Number,
    reservada: { 
        type: Boolean, 
        required: true },
    created: {
        type: Date,
        default: Date.now,
    }
});

const Habitacion = mongoose.model('Habitacion', habitacionSchema);


// Reservas
const reservaSchema =  mongoose.Schema({
    client: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cliente', 
        required: true 
    },
    habitacion: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Habitacion', 
        required: true
 },
    fechaCheckIn: {
        type: Date,
        required: true
},
    fechaCheckOut: {
        type: Date,
        required: true
}
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = { Cliente, Habitacion, Reserva };