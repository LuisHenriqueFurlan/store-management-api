import { ISaleItemRepository } from "../interfaces/ISalesItemRepository";
import { IProductVariationRepository } from "../../productVariations/interfaces/IProductVariationRepository";
import { RecalculateSaleTotalsService } from "../../sales/services/RecalculateSaleTotalsService";

export class CreateSaleItemService {

    constructor(
        private saleItemRepository: ISaleItemRepository,
        private productVariationRepository: IProductVariationRepository,
        private recalculateSaleTotalsService: RecalculateSaleTotalsService
    ) {}

    async execute(
        venda_id: string,
        produto_variacao_id: string,
        quantidade: number,
        desconto_percentual: number
    ) {

        const variation =
            await this.productVariationRepository.findByIdWithProduct(
                produto_variacao_id
            );

        if (!variation) {
            throw new Error("Variação não encontrada.");
        }

        const preco_unitario = Number(variation.produtos.preco);

        const subtotal =
            quantidade *
            preco_unitario *
            (1 - desconto_percentual / 100);

        const item = await this.saleItemRepository.create(
            venda_id,
            produto_variacao_id,
            quantidade,
            preco_unitario,
            desconto_percentual,
            subtotal
        );

        await this.recalculateSaleTotalsService.execute(venda_id);

        return item;
    }
}