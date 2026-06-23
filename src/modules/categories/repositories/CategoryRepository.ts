import { prisma } from "../../../shared/database/prisma";
import { categorias } from "@prisma/client";
import { ICategoryRepository } from "../interfaces/ICategoryRepository";

export class CategoryRepository implements ICategoryRepository{

    async findByName(nome: string): Promise<categorias | null>{

        const category = await prisma.categorias.findUnique({
            where: {
                nome,
            },
        });
    
        return category;
    }

    async create(nome: string): Promise<categorias> {
        const category  = await prisma.categorias.create({
            data: {
                nome,
            },
        });

        return category;
    }

    async findAll(): Promise<categorias[]> {
        const category = await prisma.categorias.findMany();

        return category;
    }

    async findById(id: string): Promise<categorias | null>{
        const category = await prisma.categorias.findUnique({
            where: {
                id,
            }
        });

        return category;
    }

    async delete(id: string): Promise<categorias> {
        const category = await prisma.categorias.delete({
            where: {
                id,
            },
        });

        return category;
    }

}