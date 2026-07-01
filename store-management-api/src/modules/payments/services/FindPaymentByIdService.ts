import { IPaymentRepository } from "../interfaces/IPaymentRepository";

export class FindPaymentByIdService {
    constructor(private paymentRepository: IPaymentRepository) {}

    async execute(id: string) {
        const payment = await this.paymentRepository.findById(id);

        if (!payment) {
            throw new Error("Pagamento não encontrado.");
        }

        return payment;
    }
}