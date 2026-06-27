import { ISaleItemRepository } from "../interfaces/ISalesItemRepository";
import { RecalculateSaleTotalsService } from "../../sales/services/RecalculateSaleTotalsService";
import { ISalesRepository } from "../../sales/interfaces/ISaleRepository";

export class DeleteSaleItemService {

    constructor(
        private saleItemRepository: ISaleItemRepository,
        private saleRepository: ISalesRepository,
        private recalculateSaleTotalsService: RecalculateSaleTotalsService
    ) {}

    async execute(id: string) {

        const item = await this.saleItemRepository.findById(id);

        if (!item) {
            throw new Error("Item da venda não encontrado.");
        }

        const sale = await this.saleRepository.findById(item.venda_id);

        if (!sale) {
            throw new Error("Venda não encontrada.");
        }

        if (sale.status !== "PENDENTE") {
            throw new Error("Não é possível excluir itens de uma venda finalizada.");
        }

        await this.saleItemRepository.delete(id);

        await this.recalculateSaleTotalsService.execute(item.venda_id);

        return {
            message: "Item removido com sucesso."
        };
    }

}