import { IBrandRepository } from "../interfaces/IBrandRepository";

export class FindBrandByIdService {
    constructor(private brandRepository: IBrandRepository) {

    }

    async execute(id: string) {
        const brand = await this.brandRepository.findById(id);

        if(!brand) {
            throw new Error("Marca nao encontrada. ");
        }

        return brand;
    }
}