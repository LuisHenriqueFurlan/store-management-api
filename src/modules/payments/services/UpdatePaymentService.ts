import { IPaymentRepository } from "../interfaces/IPaymentRepository";

export class UpdatePaymentService {
    constructor(private paymentRepository: IPaymentRepository) {}

    async execute(
        id: string,
        forma_pagamento: string,
        valor: number,
        parcelas: number
    ) {
        const paymentExists = await this.paymentRepository.findById(id);

        if (!paymentExists) {
            throw new Error("Pagamento não encontrado.");
        }

        const sale = await this.paymentRepository.findSaleById(paymentExists.venda_id);

        if (!sale) {
            throw new Error("Venda não encontrada.");
        }

        if (sale.status === "CANCELADA") {
            throw new Error("Não é possível alterar pagamento de uma venda cancelada.");
        }

        const totalPaid = await this.paymentRepository.getTotalPaidForSale(paymentExists.venda_id);
        const saleTotal = Number(sale.valor_final);
        const projectedValue = totalPaid - Number(paymentExists.valor) + valor;
        const remainingValue = saleTotal - projectedValue;

        if (projectedValue > saleTotal) {
            throw new Error(`O valor do pagamento excede o valor final da venda. Restam R$ ${remainingValue.toFixed(2)}.`);
        }

        const payment = await this.paymentRepository.update(
            id,
            forma_pagamento,
            valor,
            parcelas
        );

        return payment;
    }
}