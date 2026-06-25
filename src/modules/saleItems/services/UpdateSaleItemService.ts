import { ISaleItemRepository } from "../interfaces/ISalesItemRepository";

export class UpdateSaleItemService {
    constructor(private saleItemRepository: ISaleItemRepository) {}

    async execute(id: string,quantidade: number,preco_unitario: number,desconto_percentual: number) {

        const itemExists = await this.saleItemRepository.findById(id);

        if (!itemExists) {
            throw new Error("Item da venda não encontrado.");
        }

        const subtotal = quantidade * preco_unitario * (1 - desconto_percentual / 100);

        const item = await this.saleItemRepository.update(
            id,
            quantidade,
            preco_unitario,
            desconto_percentual,
            subtotal
        );

        return item;
    }
}