import { pagamentos, vendas } from "@prisma/client";

export interface IPaymentRepository {
    findById(id: string): Promise<pagamentos | null>;
    findAll(): Promise<pagamentos[]>;
    findSaleById(id: string): Promise<vendas | null>;
    getTotalPaidForSale(venda_id: string): Promise<number>;
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