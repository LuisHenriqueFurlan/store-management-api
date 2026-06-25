import { IPaymentRepository } from "../interfaces/IPaymentRepository";

export class CreatePaymentService {
    constructor(private paymentRepository: IPaymentRepository) {}

    async execute(
        venda_id: string,
        forma_pagamento: string,
        valor: number,
        parcelas: number
    ) {

        const payment = await this.paymentRepository.create(
            venda_id,
            forma_pagamento,
            valor,
            parcelas
        );

        return payment;
    }
}