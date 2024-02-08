let Schema = require('./schemas')

const clienteSchema = new Schema({
  nombre: 'Juan',
  apellido: 'Perez',
  dni: '12345678A'
})

clienteSchema.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })