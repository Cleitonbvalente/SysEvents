import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes';
import eventoRoutes from './routes/eventoRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/eventos', eventoRoutes);

// Rota de teste
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'SysEvents API funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    name: 'SysEvents API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      registrar: 'POST /api/usuarios/registrar',
      login: 'POST /api/usuarios/login',
      eventos: 'GET /api/eventos',
      criarEvento: 'POST /api/eventos (auth)',
      meusEventos: 'GET /api/eventos/meus/eventos (auth)'
    }
  });
});

app.get('/debug', (req, res) => {
  res.json({
    node_env: process.env.NODE_ENV,
    db_url_exists: !!process.env.DATABASE_URL,
    db_url_prefix: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) : 'not set'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Acesse: http://localhost:${PORT}`);
});
