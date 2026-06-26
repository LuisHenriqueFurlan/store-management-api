import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export async function ensureAuthenticated(request: FastifyRequest, reply: FastifyReply){
    
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return reply.status(401).send({
            message: "Token nao informado",
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as jwt.JwtPayload;

        request.user = {
            id: decoded.sub as string,
            nome: decoded.nome as string
        };
        
    } catch {
        return reply.status(401).send({
            message: "Token invalido",
        });
    }
};

