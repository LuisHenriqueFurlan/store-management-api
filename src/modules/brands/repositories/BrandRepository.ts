import { IBrandRepository } from "../interfaces/IBrandRepository";
import { prisma } from "../../../shared/database/prisma";
import { marcas } from "@prisma/client";


export class BrandRepository implements IBrandRepository {
    async findByName(nome: string): Promise<marcas | null> {
        const brand = await prisma.marcas.findUnique({
            where: {
                nome,
            },
        });

        return brand;
    }

    async create(nome: string): Promise<marcas> {
        const brand = await prisma.marcas.create({
            data: {
                nome,
            }
        });

        return brand;
    }

    async findAll(): Promise<marcas[]> {
        const brands = await prisma.marcas.findMany();

        return brands;
    }

    async findById(id: string): Promise<marcas | null> {
        const brand = await prisma.marcas.findUnique({
            where: {
                id,
            },
        });

        return brand;
    }

    async update(id: string, nome: string): Promise<marcas> {
        const brand = await prisma.marcas.update({
            where: {
                id,
            },
            data: {
                nome,
            },
        });

        return brand;
    }

    async delete(id: string): Promise<void> {
        const brand = await prisma.marcas.delete({
            where: {
                id,
            },
        });

    }
}