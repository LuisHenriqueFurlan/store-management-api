import { IProductRepository } from "../interfaces/IProductRepository";

export class ListProductsService {
    constructor(private productRepository: IProductRepository){

    }

    async execute() {
        const products = await this.productRepository.findAll();

        return products;
    }
}