import express from 'express';
import { Evento } from './Routers/ApiEvento.js';
import { Perfiles } from './Routers/ApiPerfiles.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para el análisis de JSON
app.use(express.json());

// Middleware para permitir el acceso a través de CORS

app.use('*',(req, res, next) => {
	const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
	  res.setHeader('Access-Control-Allow-Origin', origin);
	}
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Credentials', true); 
  	next();
  });

// Rutas
app.use('/api/evento', Evento)
app.use('/api/Perfiles', Perfiles)

// Manejo de rutas no encontradas
app.use((req, res, next) => {
	const error = new Error('Ruta no encontrada');
	error.status = 404;
	next(error);
  });

// Middleware para manejo de errores
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
	  error: {
		message: err.message
	  }
	});
  });
	
// Iniciar el servidor
app.listen(PORT, () => {
	console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
  });
  