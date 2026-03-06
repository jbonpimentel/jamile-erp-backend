import pool from '../config/db';

export interface Client {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
}

export const getAllClients = async () => {
    const [rows] = await pool.query('SELECT * FROM clientes ORDER BY nome ASC');
    return rows;
};

export const createClient = async (client: Client) => {
    const { nome, email, telefone, cpf } = client;
    const [result] = await pool.query(
        'INSERT INTO clientes (nome, email, telefone, cpf) VALUES (?, ?, ?, ?)',
        [nome, email, telefone, cpf]
    );
    return result;
};