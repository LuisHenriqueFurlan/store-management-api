import { IBrandRepository } from "../interfaces/IBrandRepository";

export class CreateBrandService {
    constructor(private brandRepository: IBrandRepository) {

    }

    async execute(nome: string) {
        const brandExists = await this.brandRepository.findByName(nome);

        if (brandExists) {
            throw new Error("Marca ja existe. ");
        }

        const newBrand = await this.brandRepository.create(nome);

        return newBrand;
    }


}