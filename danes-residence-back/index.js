const config = require('./config.js');
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/mongo')

app.use(express.json())

connectDB()

//habilitar cors
app.use(cors())

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api/habitacion', require('./routes/habitacion'));
app.use('/api/reserva', require('./routes/reserva'));

// app.use((error, request, response, next) => {
//   console.error('estamo en el next padre' + error.name)

//   if(error.name === 'CastError'){
//     response.status(400).send({ error: 'id invalido' })
//   } else {
//     response.status(500).end()
//   }
// })

app.listen(config.PORT, config.HOST, function () {
  console.log(`Server running on http://${config.HOST}:${config.PORT}`);
});
