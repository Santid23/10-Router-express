const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Cliente, Habitacion, Reserva } = require('../schemas');

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.post('/nuevaHabitacion', async (req, res) => {

    let {numeroHabitacion, estado} = req.body;

    try {

        let habitacionNueva = new Habitacion({ 
            _id: new mongoose.Types.ObjectId(),
            numeroHabitacion, 
            estado,
        });

        await habitacionNueva.save();
        res.status(200).send({
            mensaje: 'Habitacion añadida: ' + habitacionNueva.numeroHabitacion,
            habitacionNueva
        });
        
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al añadir',
            error
        });
    }
}) 

module.exports = router;