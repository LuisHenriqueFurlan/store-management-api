import { pagamentos } from "@prisma/client";

export interface IPaymentRepository {
    findById(id: string): Promise<pagamentos | null>;
    findAll(): Promise<pagamentos[]>;
    create(
        venda_id: string,
        forma_pagamento: string,
        valor: number,
        parcelas: number
    ): Promise<pagamentos>;
    update(
        id: string,
        forma_pagamento: string,
        valor: number,
        parcelas: number
    ): Promise<pagamentos>;
    delete(id: string): Promise<void>;
}