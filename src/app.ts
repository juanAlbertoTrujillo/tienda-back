import express from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/index';
import cors from 'cors';

const app = express();

//configuracion
app.set('port', process.env.PORT || 4000)
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api', indexRoutes);

export default app;