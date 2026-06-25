import { ISalesRepository } from "../interfaces/ISaleRepository";

export class CreateSaleService {
    constructor(private saleRepository: ISalesRepository) {}

    async execute(usuario_id: string,valor_bruto: number,valor_desconto: number,valor_final: number,status: string,) {
        const sale = await this.saleRepository.create(
            usuario_id,
            valor_bruto,
            valor_desconto,
            valor_final,
            status
        );

        return sale;
    }
}