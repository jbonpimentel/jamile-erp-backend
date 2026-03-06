import pool from '../config/db';

export interface User {
    id?: number;
    nome: string;
    email: string;
    senha?: string;
    role: 'admin' | 'vendedor' | 'atendente';
    area: 'comercio' | 'atendimento' | 'ambos';
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
};