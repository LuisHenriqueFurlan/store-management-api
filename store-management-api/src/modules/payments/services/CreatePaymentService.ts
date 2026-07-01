import { IPaymentRepository } from "../interfaces/IPaymentRepository";

export class CreatePaymentService {
    constructor(private paymentRepository: IPaymentRepository) {}

    async execute(
        venda_id: string,
        forma_pagamento: string,
        valor: number,
        parcelas: number
    ) {
        const sale = await this.paymentRepository.findSaleById(venda_id);

        if (!sale) {
            throw new Error("Venda não encontrada.");
        }

        if (sale.status === "CANCELADA") {
            throw new Error("Não é possível registrar pagamento para uma venda cancelada.");
        }

        const totalPaid = await this.paymentRepository.getTotalPaidForSale(venda_id);
        const saleTotal = Number(sale.valor_final);
        const remainingValue = saleTotal - totalPaid;

        if (valor > remainingValue) {
            throw new Error(`O valor do pagamento excede o valor final da venda. Restam R$ ${remainingValue.toFixed(2)}.`);
        }

        const payment = await this.paymentRepository.create(
            venda_id,
            forma_pagamento,
            valor,
            parcelas
        );

        return payment;
    }
}