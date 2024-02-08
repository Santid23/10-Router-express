const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Cliente, Habitacion, Reserva } = require('../schemas');

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.put('/:dni', async (req, res) => {
    let dni = req.params.dni;
    try {
        const cliente = await Cliente.findOne({ dni: dni }); 
        if (!cliente) return res.status(401).send("Cliente no encontrado");
        const reserva = await Reservae.findOne({cliente: cliente._id});
        const habitacion = await Habitacion.findOne({_id: reserva.habitacion._id});
        habitacion.estado = false;
        await habitacion.save();
            res.status(200).send({
                mensaje: 'Checkout realizado '
            });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error en el checkout',
            error
        });
    }
}) 

module.exports = router;