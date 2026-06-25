import { FastifyReply, FastifyRequest } from "fastify";
import { PaymentRepository } from "../repositories/PaymentRepository";
import { CreatePaymentService } from "../services/CreatePaymentService";
import { ListPaymentsService } from "../services/ListPaymentsService";
import { FindPaymentByIdService } from "../services/FindPaymentByIdService";
import { UpdatePaymentService } from "../services/UpdatePaymentService";
import { DeletePaymentService } from "../services/DeletePaymentService";

export class PaymentController {

    async create(request: FastifyRequest, reply: FastifyReply) {

        const {
            venda_id,
            forma_pagamento,
            valor,
            parcelas
        } = request.body as {
            venda_id: string;
            forma_pagamento: string;
            valor: number;
            parcelas: number;
        };

        const repository = new PaymentRepository();
        const service = new CreatePaymentService(repository);

        const payment = await service.execute(
            venda_id,
            forma_pagamento,
            valor,
            parcelas
        );

        return reply.status(201).send(payment);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {

        const repository = new PaymentRepository();
        const service = new ListPaymentsService(repository);

        const payments = await service.execute();

        return reply.send(payments);
    }

    async findById(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.params as {
            id: string;
        };

        const repository = new PaymentRepository();
        const service = new FindPaymentByIdService(repository);

        const payment = await service.execute(id);

        return reply.send(payment);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.params as {
            id: string;
        };

        const {
            forma_pagamento,
            valor,
            parcelas
        } = request.body as {
            forma_pagamento: string;
            valor: number;
            parcelas: number;
        };

        const repository = new PaymentRepository();
        const service = new UpdatePaymentService(repository);

        const payment = await service.execute(
            id,
            forma_pagamento,
            valor,
            parcelas
        );

        return reply.send(payment);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.params as {
            id: string;
        };

        const repository = new PaymentRepository();
        const service = new DeletePaymentService(repository);

        const result = await service.execute(id);

        return reply.send(result);
    }
}