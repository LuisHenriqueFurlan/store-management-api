import { ISaleItemRepository } from "../interfaces/ISalesItemRepository";
import { IProductVariationRepository } from "../../productVariations/interfaces/IProductVariationRepository";
import { RecalculateSaleTotalsService } from "../../sales/services/RecalculateSaleTotalsService";
import { ISalesRepository } from "../../sales/interfaces/ISaleRepository";

export class UpdateSaleItemService {

    constructor(
        private saleItemRepository: ISaleItemRepository,
        private productVariationRepository: IProductVariationRepository,
        private saleRepository: ISalesRepository,
        private recalculateSaleTotalsService: RecalculateSaleTotalsService
    ) {}

    async execute(
        id: string,
        quantidade: number,
        desconto_percentual: number
    ) {

        const item = await this.saleItemRepository.findById(id);

        if (!item) {
            throw new Error("Item da venda não encontrado.");
        }

        const quantidadeAnterior = item.quantidade;

        const diferenca = quantidade - quantidadeAnterior;

        const sale = await this.saleRepository.findById(item.venda_id);

        if (!sale) {
            throw new Error("Venda não encontrada.");
        }

        if (sale.status !== "PENDENTE") {
            throw new Error("Não é possível alterar itens de uma venda finalizada.");
        }

        const variation =
            await this.productVariationRepository.findByIdWithProduct(
                item.produto_variacao_id
            );

        if (!variation) {
            throw new Error("Variação não encontrada.");
        }

        if (
            diferenca > 0 &&
            variation.quantidade_estoque < diferenca
        ) {
            throw new Error("Estoque insuficiente.");
        }

        const preco_unitario = Number(variation.produtos.preco);

        const subtotal =
            quantidade *
            preco_unitario *
            (1 - desconto_percentual / 100);

      
        if (diferenca > 0) {

            await this.productVariationRepository.decreaseStock(
                item.produto_variacao_id,
                diferenca
            );

        }

        
        if (diferenca < 0) {

            await this.productVariationRepository.increaseStock(
                item.produto_variacao_id,
                Math.abs(diferenca)
            );

        }

        const updatedItem =
            await this.saleItemRepository.update(
                id,
                item.venda_id,
                item.produto_variacao_id,
                quantidade,
                preco_unitario,
                desconto_percentual,
                subtotal
            );

        await this.recalculateSaleTotalsService.execute(
            item.venda_id
        );

        return updatedItem;
    }
}