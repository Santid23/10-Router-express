const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Cliente, Habitacion, Reserva } = require('../schemas');

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.post('/nuevaReserva', async (req, res) => {

    let { dni, numeroHabitacion, checkIn, checkOut } = req.body;

    try {
        const cliente = await Cliente.findOne({ dni: dni });
        if (!cliente) return res.status(401).send("Cliente no encontrado");
        const habitacion = await Habitacion.findOne({ numeroHabitacion });
        if (habitacion.estado === true) {
            return res.send({ mensaje: "La habitación no está disponible" });
        } else {
            habitacion.estado = true;
            await habitacion.save();
            const newReserva = new Reserva({
                _id: new mongoose.Types.ObjectId(),
                habitacion: habitacion._id,
                checkIn,
                checkOut,
                cliente: cliente._id
            });

            await newReserva.save()

            res.status(200).send({
                mensaje: 'Reserva realizada ' + newReserva._id
            });
        }

    } catch (error) {
        res.status(500).send({
            mensaje: 'Error reservar',
            error
        });
    }
})

module.exports = router;