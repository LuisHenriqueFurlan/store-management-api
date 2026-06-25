import { ISaleItemRepository } from "../interfaces/ISalesItemRepository";

export class ListSaleItemService {
    constructor(private saleItemRepository: ISaleItemRepository) {}

    async execute() {
        const items = await this.saleItemRepository.findAll();

        return items;
    }
}