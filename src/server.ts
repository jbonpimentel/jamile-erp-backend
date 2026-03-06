import * as http from 'http';
import * as dotenv from 'dotenv';
import pool from './config/db';
import { login } from './controllers/AuthController';

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

    // --- ROTA DE TESTE (GET) ---
    if (req.url === '/api/test' && req.method === 'GET') {
        try {
            const [rows] = await pool.query('SELECT "TypeScript + MySQL OK" as status');
            res.writeHead(200);
            res.end(JSON.stringify({ data: rows }));
        } catch (error: any) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: "Erro no banco", details: error.message }));
        }
    }

    // --- ROTA DE LOGIN (POST) ---
    else if (req.url === '/api/login' && req.method === 'POST') {
        await login(req, res);
    }

    // --- ROTA NÃO ENCONTRADA ---
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Rota não encontrada" }));
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor J'amile rodando em http://localhost:${PORT}`);
});