import { IProductVariationRepository } from "../interfaces/IProductVariationRepository";

export class ListProductVariationsService {
    constructor(private variationRepository: IProductVariationRepository) {

    }

    async execute(){
        const variacoes = await this.variationRepository.findAll();

        return variacoes;
    }

}