import { pagamentos } from "@prisma/client";
import { prisma } from "../../../shared/database/prisma";
import { IPaymentRepository } from "../interfaces/IPaymentRepository";

export class PaymentRepository implements IPaymentRepository {

    async findById(id: string): Promise<pagamentos | null> {
        const payment = await prisma.pagamentos.findUnique({
            where: {
                id,
            },
        });

        return payment;
    }

    async findAll(): Promise<pagamentos[]> {
        const payments = await prisma.pagamentos.findMany();

        return payments;
    }

    async create(
        venda_id: string,
        forma_pagamento: string,
        valor: number,
        parcelas: number
    ): Promise<pagamentos> {

        const payment = await prisma.pagamentos.create({
            data: {
                venda_id,
                forma_pagamento,
                valor,
                parcelas,
            },
        });

        return payment;
    }

    async update(
        id: string,
        forma_pagamento: string,
        valor: number,
        parcelas: number
    ): Promise<pagamentos> {

        const payment = await prisma.pagamentos.update({
            where: {
                id,
            },
            data: {
                forma_pagamento,
                valor,
                parcelas,
            },
        });

        return payment;
    }
    async delete(id: string): Promise<void> {
        await prisma.pagamentos.delete({
            where: {
                id,
            },
        });
    }
}