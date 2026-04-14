import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    status: 'online'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Acesse: http://localhost:${PORT}`);
});
