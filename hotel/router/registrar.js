const express = require('express');
const router = express.Router();
let { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Cliente, Habitacion, Reserva } = require('../schemas');

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.post('/clienteNuevo', async (req, res) => {

    let {nombre, apellido, dni} = req.body;

    try {
        let clienteNuevo = await Cliente.create({ 
            _id: new mongoose.Types.ObjectId(),
            nombre, 
            apellido, 
            dni 
        });
        await clienteNuevo.save();
        res.status(200).send({
            mensaje: 'Cliente añadido: ' + clienteNuevo.nombre,
            clienteNuevo
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al añadir',
            error
        });
    }
}) 

router.put('/modificarCliente/:id', async (req,res)=>{
    let { nombre, apellido } = req.body;
    let _id = req.params.id;
    try {
        let results = await  Cliente.findByIdAndUpdate(_id ,{ $set:{ nombre, apellido }}); 
        res.status(200).send({ 
            mensaje:'Se ha modificado el cliente correctamente',
            results
        });
    } catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }


}),

module.exports = router;