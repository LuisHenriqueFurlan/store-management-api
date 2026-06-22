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
        jwt.verify(
            token,
            process.env.JWT_SECRET as string,
        );
    } catch {
        return reply.status(401).send({
            message: "Token invalido",
        });
    }
};

