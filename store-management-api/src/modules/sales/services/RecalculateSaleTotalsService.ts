import { ISalesRepository } from "../interfaces/ISaleRepository";
import { ISaleItemRepository } from "../../saleItems/interfaces/ISalesItemRepository";

export class RecalculateSaleTotalsService {

    constructor(
        private salesRepository: ISalesRepository,
        private saleItemRepository: ISaleItemRepository
    ) {}

    async execute(venda_id: string) {

        const items = await this.saleItemRepository.findBySaleId(venda_id);

        let valorBruto = 0;
        let valorDesconto = 0;
        let valorFinal = 0;

        for (const item of items) {

            valorBruto += Number(item.preco_unitario) * item.quantidade;

            valorFinal += Number(item.subtotal);

            valorDesconto +=
                Number(item.preco_unitario) *
                item.quantidade -
                Number(item.subtotal);
        }

        return await this.salesRepository.updateTotals(
            venda_id,
            valorBruto,
            valorDesconto,
            valorFinal
        );
    }
}