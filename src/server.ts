import http from 'http';
import pool from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.url === '/api/test' && req.method === 'GET') {
        try {
            const [rows] = await pool.query('SELECT "TypeScript + MySQL OK" as status');
            res.writeHead(200);
            res.end(JSON.stringify({ data: rows }));
        } catch (error: any) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Rota não encontrada" }));
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor TypeScript rodando em http://localhost:${PORT}`);
});