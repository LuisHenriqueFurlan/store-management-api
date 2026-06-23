import { ICategoryRepository } from "../interfaces/ICategoryRepository";

export class DeleteCategoryService {
    constructor(private categoryRepository: ICategoryRepository){

    }
    async execute(id: string) {
       const category = await this.categoryRepository.findById(id);

       if (!category){
            throw new Error("Categoria inexistente! ");
       }

       await this.categoryRepository.delete(id);

       return { message: "Categoria deletada com sucesso. "}
    }
}