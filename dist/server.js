"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
            usuarios: 'POST /api/usuarios/registrar, POST /api/usuarios/login'
        }
    });
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📡 Acesse: http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
