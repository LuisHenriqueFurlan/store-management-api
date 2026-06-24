import { marcas } from "@prisma/client";

export interface IBrandRepository {
    findByName(nome: string): Promise<marcas | null>;
    findById(id: string): Promise<marcas | null>;
    findAll(): Promise<marcas[]>;
    create(nome: string): Promise<marcas>;
    update(id: string, nome:string): Promise<marcas>;
    delete(id: string): Promise<void>;
}