import { IProductVariationRepository } from "../interfaces/IProductVariationRepository";

export class FindProductVariationByIdService {
    constructor(private variationRepository: IProductVariationRepository) {

    }

    async execute(id: string) {
        const variations = await this.variationRepository.findById(id);

        if(!variations){
            throw new Error("Variaçao nao existe. ");
        }

        return variations;
    }

    
}