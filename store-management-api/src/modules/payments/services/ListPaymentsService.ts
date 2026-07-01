import { IPaymentRepository } from "../interfaces/IPaymentRepository";

export class ListPaymentsService {
    constructor(private paymentRepository: IPaymentRepository) {}

    async execute() {
        const payments = await this.paymentRepository.findAll();

        return payments;
    }
}