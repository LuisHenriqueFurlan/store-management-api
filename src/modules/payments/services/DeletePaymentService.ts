import { IPaymentRepository } from "../interfaces/IPaymentRepository";

export class DeletePaymentService {
    constructor(private paymentRepository: IPaymentRepository) {}

    async execute(id: string) {

        const paymentExists = await this.paymentRepository.findById(id);

        if (!paymentExists) {
            throw new Error("Pagamento não encontrado.");
        }

        await this.paymentRepository.delete(id);

        return {
            message: "Pagamento deletado com sucesso."
        };
    }
}