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

        const payment = await this.paymentRepository.update(
            id,
            forma_pagamento,
            valor,
            parcelas
        );

        return payment;
    }
}