import { categorias } from "@prisma/client";

export interface ICategoryRepository {
    findByName(nome: string): Promise<categorias | null>;
    create(nome: string): Promise<categorias>;
    findAll(): Promise<categorias[]>;
    findById(id: string): Promise<categorias | null>;
    delete(id: string): Promise<categorias>;
}
