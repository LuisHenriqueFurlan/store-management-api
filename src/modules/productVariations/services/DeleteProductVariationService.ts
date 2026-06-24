import { IProductVariationRepository } from "../interfaces/IProductVariationRepository";

export class DeleteProductVariationService {
    constructor(private variationRepository: IProductVariationRepository) {

    }

    async execute(id: string) {
        const variationExists = await this.variationRepository.findById(id);

        if(!variationExists) {
            throw new Error("A variaçao nao existe. ");
            
        }

        await this.variationRepository.delete(id);

        return { message: "Deletado com sucesso. "}
    }
}