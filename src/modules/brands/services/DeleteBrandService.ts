import { IBrandRepository } from "../interfaces/IBrandRepository";

export class DeleteBrandService {
    constructor(private brandRepository: IBrandRepository) {}

    async execute(id: string) {
        const brand = await this.brandRepository.findById(id);

        if (!brand) {
            throw new Error("Marca não encontrada.");
        }

        await this.brandRepository.delete(id);

        return {
            message: "Marca deletada com sucesso."
        };
    }
}