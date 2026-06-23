import { IProductRepository } from "../interfaces/IProductRepository";

export class CreateProductService {
    constructor(private productRepository: IProductRepository) {

}
    async execute(
        nome: string,
        descricao: string | null,
        preco: number,
        categoria_id: string,
        marca_id: string
    ) {

        const productExists = await this.productRepository.findByName(nome);

        if (productExists) {
            throw new Error("Produto já existe");
        }

        const product = await this.productRepository.create(
            nome,
            descricao,
            preco,
            categoria_id,
            marca_id
        );

        return product;
    }
}