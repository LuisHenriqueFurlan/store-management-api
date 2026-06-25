import { ISaleItemRepository } from "../interfaces/ISalesItemRepository";

export class FindSaleItemByIdService {
    constructor(private saleItemRepository: ISaleItemRepository) {}

    async execute(id: string) {
        const item = await this.saleItemRepository.findById(id);

        if (!item) {
            throw new Error("Item da venda não encontrado.");
        }

        return item;
    }
}