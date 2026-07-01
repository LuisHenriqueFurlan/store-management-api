import { produtos } from "@prisma/client";

export interface IProductRepository {
    findByName(nome: string): Promise<produtos | null>;
    create(
        nome: string,
        descricao: string | null,
        preco: number,
        categoria_id: string,
        marca_id: string
    ): Promise<produtos>;
    findAll(): Promise<produtos[]>;
    findById(id: string): Promise<produtos | null>;
    delete(id: string): Promise<void>;
    update(id: string,nome: string,descricao: string | null,preco: number,categoria_id: string,marca_id: string): Promise<produtos>;
}

