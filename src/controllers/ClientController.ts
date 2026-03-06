import { getAllClients, createClient } from '../models/Client';

export const listClients = async (req: any, res: any) => {
    try {
        const clients = await getAllClients();
        res.writeHead(200);
        res.end(JSON.stringify(clients));
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Erro ao buscar clientes" }));
    }
};

export const addClient = async (req: any, res: any) => {
    let body = '';
    req.on('data', (chunk: any) => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const newClient = JSON.parse(body);
            await createClient(newClient);
            res.writeHead(201);
            res.end(JSON.stringify({ message: "Cliente cadastrado com sucesso!" }));
        } catch (error) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Erro ao cadastrar cliente. CPF duplicado?" }));
        }
    });
};