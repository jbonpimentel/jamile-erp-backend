import * as http from 'http';
import * as dotenv from 'dotenv';
import { login } from './controllers/AuthController';
import { listClients, addClient } from './controllers/ClientController';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    // Configuração de Headers (CORS e JSON)
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Resposta para o pre-flight do CORS
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // --- ROTEAMENTO ---

    // 1. Rota de Login
    if (req.url === '/api/login' && req.method === 'POST') {
        await login(req, res);
    }

    // 2. Rota de Listar Clientes
    else if (req.url === '/api/clientes' && req.method === 'GET') {
        await listClients(req, res);
    }

    // 3. Rota de Cadastrar Cliente
    else if (req.url === '/api/clientes' && req.method === 'POST') {
        await addClient(req, res);
    }

    // 4. Rota não encontrada
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Rota não encontrada" }));
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor J'amile rodando em http://localhost:${PORT}`);
});