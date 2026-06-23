import { IProductRepository } from "../interfaces/IProductRepository";

export class UpdateProductService {
    constructor(private productRepository: IProductRepository) {

    }

    async execute(id: string,nome: string,descricao: string | null,preco: number,categoria_id: string,marca_id: string) {
        const product = await this.productRepository.findById(id);

        if(!product) {
            throw new Error("Produto nao encontrado. ");
            
        }

        const updateProduct = await this.productRepository.update(
                id,
                nome,
                descricao,
                preco,
                categoria_id,
                marca_id
        );

        return updateProduct;
    }
}