import { ICategoryRepository } from "../interfaces/ICategoryRepository";

export class ListCategoriesService {
    constructor( private categoryRepository: ICategoryRepository){

    }

    async execute(){
        const categories = await this.categoryRepository.findAll();

        return categories
    }
}