import { ISalesRepository } from "../interfaces/ISaleRepository";
import { ISaleItemRepository } from "../../saleItems/interfaces/ISalesItemRepository";
import { IProductVariationRepository } from "../../productVariations/interfaces/IProductVariationRepository";

export class CancelSaleService {

    constructor(
        private saleRepository: ISalesRepository,
        private saleItemRepository: ISaleItemRepository,
        private productVariationRepository: IProductVariationRepository
    ) {}

    async execute(id: string) {
    const sale = await this.saleRepository.findById(id);

    if (!sale) {
        throw new Error("Venda não encontrada.");
    }

    if (sale.status === "FINALIZADA") {
        throw new Error("Não é possível cancelar uma venda finalizada.");
    }

    if (sale.status === "CANCELADA") {
        throw new Error("Esta venda já foi cancelada.");
    }

    const saleItems = await this.saleItemRepository.findBySaleId(id);

    for (const item of saleItems) {

    await this.productVariationRepository.increaseStock(
        item.produto_variacao_id,
        item.quantidade
    );

    }

    const updatedSale = await this.saleRepository.updateStatus(
        id,
        "CANCELADA"
    );

    return await this.saleRepository.findById(id);

}

}