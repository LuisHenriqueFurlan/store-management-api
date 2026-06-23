import { IProductRepository } from "../interfaces/IProductRepository";

export class FindProductByIdService {
    constructor(private productRepository: IProductRepository) {

    }

    async execute(id: string) {
        const product = await this.productRepository.findById(id);

        if(!product) {
            throw new Error("Produto nao encontrado. ");
        }

        return product;
    }
}