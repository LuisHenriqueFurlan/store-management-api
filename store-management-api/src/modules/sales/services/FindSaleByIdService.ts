import { ISalesRepository } from "../interfaces/ISaleRepository";

export class FindSaleByIdService {
    constructor(private saleRepository: ISalesRepository) {}

    async execute(id: string) {
        const sale = await this.saleRepository.findById(id);

        if (!sale) {
            throw new Error("Venda não encontrada.");
        }

        return sale;
    }
}