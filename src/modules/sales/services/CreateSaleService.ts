import { ISalesRepository } from "../interfaces/ISaleRepository";

export class CreateSaleService {
    constructor(private saleRepository: ISalesRepository) {}

async execute(usuario_id: string) {

    const sale = await this.saleRepository.create(
        usuario_id,
        "PENDENTE"
    );

    return sale;
}
}