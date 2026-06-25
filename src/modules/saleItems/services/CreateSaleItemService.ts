import { ISaleItemRepository } from "../interfaces/ISalesItemRepository";

export class CreateSaleItemService {
    constructor(private saleItemRepository: ISaleItemRepository) {}

    async execute(
        venda_id: string,
        produto_variacao_id: string,
        quantidade: number,
        preco_unitario: number,
        desconto_percentual: number
    ) {

        const subtotal = quantidade * preco_unitario * (1 - desconto_percentual / 100);

        const item = await this.saleItemRepository.create(
            venda_id,
            produto_variacao_id,
            quantidade,
            preco_unitario,
            desconto_percentual,
            subtotal
        );

        return item;
    }
}