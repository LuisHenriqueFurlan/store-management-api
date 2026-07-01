import { FastifyReply, FastifyRequest } from "fastify";
import { PaymentRepository } from "../repositories/PaymentRepository";
import { CreatePaymentService } from "../services/CreatePaymentService";
import { ListPaymentsService } from "../services/ListPaymentsService";
import { FindPaymentByIdService } from "../services/FindPaymentByIdService";
import { UpdatePaymentService } from "../services/UpdatePaymentService";
import { DeletePaymentService } from "../services/DeletePaymentService";
import { createPaymentSchema } from "../schemas/CreatePaymentSchema";
import { updatePaymentSchema } from "../schemas/UpdatePaymentSchema";
import { paymentIdSchema } from "../schemas/PaymentIdSchema";

export class PaymentController {

    async create(request: FastifyRequest, reply: FastifyReply) {

        const data = createPaymentSchema.parse(request.body);

        const repository = new PaymentRepository();
        const service = new CreatePaymentService(repository);

        const payment = await service.execute(
            data.venda_id,
            data.forma_pagamento,
            data.valor,
            data.parcelas
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

        const { id } = paymentIdSchema.parse(request.params);

        const repository = new PaymentRepository();
        const service = new FindPaymentByIdService(repository);

        const payment = await service.execute(id);

        return reply.send(payment);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {

        const { id } = paymentIdSchema.parse(request.params);

        const data = updatePaymentSchema.parse(request.body);

        const repository = new PaymentRepository();
        const service = new UpdatePaymentService(repository);

        const payment = await service.execute(
            id,
            data.forma_pagamento,
            data.valor,
            data.parcelas
        );

        return reply.send(payment);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {

        const { id } = paymentIdSchema.parse(request.params);

        const repository = new PaymentRepository();
        const service = new DeletePaymentService(repository);

        const result = await service.execute(id);

        return reply.send(result);
    }
}