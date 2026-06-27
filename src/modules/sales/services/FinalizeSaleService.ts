import { ISalesRepository } from "../interfaces/ISaleRepository";
import { ISaleItemRepository } from "../../saleItems/interfaces/ISalesItemRepository";


export class FinalizeSaleService {
    constructor(
        private saleRepository: ISalesRepository,
        private saleItemRepository: ISaleItemRepository
    ) {

        }

async execute(id: string) {

    const sale = await this.saleRepository.findById(id);

    if (!sale) {
        throw new Error("Venda não encontrada.");
    }

    if (sale.status === "FINALIZADA") {
        throw new Error("Esta venda já foi finalizada.");
    }

    if (sale.status === "CANCELADA") {
        throw new Error("Não é possível finalizar uma venda cancelada.");
    }


    const saleItems = await this.saleItemRepository.findBySaleId(id);

    if (saleItems.length === 0) {
    throw new Error("Não é possível finalizar uma venda sem itens.");
    }

    const updatedSale = await this.saleRepository.updateStatus(
    id,
    "FINALIZADA"
    );

    return updatedSale;
}
}