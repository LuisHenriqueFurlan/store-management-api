import { ICategoryRepository } from "../interfaces/ICategoryRepository";

export class FindCategoryByIdService {
    constructor (private categoryRepository: ICategoryRepository){

    }

    async execute(id: string){
        const category = await this.categoryRepository.findById(id);
        
        if (!category){
            throw new Error("Categoria nao existe! ");
        }

        return category;
    }
}