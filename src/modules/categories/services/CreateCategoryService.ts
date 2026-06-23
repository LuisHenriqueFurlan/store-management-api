import { ICategoryRepository } from "../interfaces/ICategoryRepository";

export class CreateCategoryService {
    constructor(private categoryRepository: ICategoryRepository){

    }
    async execute(nome: string) {
        const categoryExists = await this.categoryRepository.findByName(nome);

        if (categoryExists){
            throw new Error("categoria ja existe");
        }

        const category = await this.categoryRepository.create(nome);

        return category;
    }
}