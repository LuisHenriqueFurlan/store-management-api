import { CreateSaleItemService } from "../../saleItems/services/CreateSaleItemService";
import { IProductVariationRepository } from "../../productVariations/interfaces/IProductVariationRepository";
import { CreateStockMovementService } from "../../stockMovements/services/CreateStockMovementService";
import { ISalesRepository } from "../interfaces/ISaleRepository";

export class ProcessSaleItemService {
    constructor(
        private createSaleItemService: CreateSaleItemService,
        private createStockMovementService: CreateStockMovementService,
        private productVariationRepository: IProductVariationRepository,
        private saleRepository: ISalesRepository
    ) {}

    async execute(
        venda_id: string,
        produto_variacao_id: string,
        quantidade: number,
        desconto_percentual: number,
        usuario_id: string
    ) {

        const sale = await this.saleRepository.findById(venda_id);

        if (!sale) {
        throw new Error("Venda não encontrada.");
        }

        if (sale.status === "FINALIZADA") {
        throw new Error("Não é possível alterar uma venda finalizada.");
        }

        if (sale.status === "CANCELADA") {
        throw new Error("Não é possível alterar uma venda cancelada.");
        }

        const variation = await this.productVariationRepository.findById(produto_variacao_id);

        if (!variation) {
            throw new Error("Variação do produto não encontrada.");
        }

        if (variation.quantidade_estoque < quantidade) {
            throw new Error("Estoque insuficiente.");
        }

        const item = await this.createSaleItemService.execute(
            venda_id,
            produto_variacao_id,
            quantidade,
            desconto_percentual
        );

        await this.productVariationRepository.decreaseStock(
            produto_variacao_id,
            quantidade
        );

        await this.createStockMovementService.execute(
            produto_variacao_id,
            usuario_id,
            "SAIDA",
            quantidade,
            `Venda ${venda_id}`
        );

        return item;
    }
}