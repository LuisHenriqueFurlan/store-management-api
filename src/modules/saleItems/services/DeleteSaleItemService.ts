import { ISaleItemRepository } from "../interfaces/ISalesItemRepository";

export class DeleteSaleItemService {
    constructor(private saleItemRepository: ISaleItemRepository) {}

    async execute(id: string) {

        const itemExists = await this.saleItemRepository.findById(id);

        if (!itemExists) {
            throw new Error("Item da venda não encontrado.");
        }

        await this.saleItemRepository.delete(id);

        return {
            message: "Item da venda deletado com sucesso."
        };
    }
}