import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

// Configuração CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/usuarios', usuarioRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date(), environment: process.env.NODE_ENV });
});

// Error handler
app.use(errorHandler);

export default app;
