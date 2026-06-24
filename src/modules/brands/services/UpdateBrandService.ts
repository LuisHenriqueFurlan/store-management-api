import { IBrandRepository } from "../interfaces/IBrandRepository";

export class UpdateBrandService {
    constructor(private brandRepository: IBrandRepository) {
        
    }

    async execute(id: string, nome: string) {
        const brand = await this.brandRepository.findById(id);

        if (!brand) {
            throw new Error("Marca não encontrada.");
        }

        const brandExists = await this.brandRepository.findByName(nome);

        if (brandExists && brandExists.id !== id) {
            throw new Error("Já existe uma marca com esse nome.");
        }

        const updatedBrand = await this.brandRepository.update(
            id,
            nome
        );

        return updatedBrand;
    }
}