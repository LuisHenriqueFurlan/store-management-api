import { IProductVariationRepository } from "../interfaces/IProductVariationRepository";

export class UpdateProductVariationService {
    constructor(private variationRepository: IProductVariationRepository) {

    }
    async execute(id: string,tamanho: string,quantidade_estoque: number,estoque_minimo: number) {
        const variationExists = await this.variationRepository.findById(id);

        if(!variationExists) {
            throw new Error("A variacao nao existe. ");
            
        }

        const variationUpdated = await this.variationRepository.update(id,tamanho,quantidade_estoque,estoque_minimo);

        return variationUpdated;

    }
    

}