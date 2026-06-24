import { IProductVariationRepository } from "../interfaces/IProductVariationRepository";

export class CreateProductVariationService {
    constructor(private variationRepository: IProductVariationRepository) {

    }

    async execute(produto_id: string, tamanho: string, quantidade_estoque: number, estoque_minimo: number) {
        const variationExists = await this.variationRepository.findByProductAndSize(produto_id, tamanho);

        if(variationExists) {
            throw new Error("Variaçao de produtos ja existe. ");
        }

        const variation = await this.variationRepository.create(produto_id, tamanho, quantidade_estoque, estoque_minimo);

        return variation;

    }

}