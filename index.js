import express from 'express';
import { Evento } from './Routers/routeEvento.js';
const app = express();
const port = 7000;

app.use(express.json())
app.use('/api/evento', Evento)

app.listen(port, ()=>{
	console.log(`escuchando en el puerto ${port}`)
});
