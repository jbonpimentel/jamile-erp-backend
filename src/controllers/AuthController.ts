import { findUserByEmail } from '../models/User';

export const login = async (req: any, res: any) => {
    let body = '';

    // Captura os dados enviados pelo Frontend (Node Puro)
    req.on('data', (chunk: any) => { body += chunk.toString(); });

    req.on('end', async () => {
        try {
            const { email, senha } = JSON.parse(body);
            const user = await findUserByEmail(email);

            if (user && user.senha === senha) { // Em produção usaríamos bcrypt aqui
                res.writeHead(200);
                res.end(JSON.stringify({
                    message: "Login realizado com sucesso!",
                    user: { nome: user.nome, role: user.role, area: user.area }
                }));
            } else {
                res.writeHead(401);
                res.end(JSON.stringify({ error: "E-mail ou senha inválidos." }));
            }
        } catch (error) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Dados inválidos." }));
        }
    });
};