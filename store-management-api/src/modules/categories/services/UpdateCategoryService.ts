import { ICategoryRepository } from "../interfaces/ICategoryRepository";

export class UpdateCategoryService {
    constructor(private categoryRepository: ICategoryRepository) {}

    async execute(id: string, nome: string) {
        const category = await this.categoryRepository.findById(id);

        if (!category) {
            throw new Error("Categoria nao encontrada.");
        }

        const categoryWithSameName = await this.categoryRepository.findByName(nome);

        if (categoryWithSameName && categoryWithSameName.id !== id) {
            throw new Error("Categoria ja cadastrada.");
        }

        return this.categoryRepository.update(id, nome);
    }
}
