import { IBrandRepository } from "../interfaces/IBrandRepository";

export class ListBrandService {
    constructor(private brandRepository: IBrandRepository) {

    }

    async execute() {
        const brands = await this.brandRepository.findAll();

        if(brands.length === 0) {
            throw new Error("Sem marcas cadastradas. ");
            
        }

        return brands;
    }
}