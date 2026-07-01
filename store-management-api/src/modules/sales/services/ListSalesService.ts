import { ISalesRepository } from "../interfaces/ISaleRepository";

export class ListSalesService {
    constructor(private saleRepository: ISalesRepository) {}

    async execute() {
        const sales = await this.saleRepository.findAll();

        return sales;
    }
}