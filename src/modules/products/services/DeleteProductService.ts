import { IProductRepository } from "../interfaces/IProductRepository";

export class DeleteProductService {
    constructor(private productRepository: IProductRepository) {

    }

    async execute(id: string) {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new Error("Produto nao encontrado.");
        }

        await this.productRepository.delete(id);

        return { message: "Produto deletado com sucesso. "};
    }

}