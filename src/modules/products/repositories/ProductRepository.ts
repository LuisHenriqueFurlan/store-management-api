import { prisma } from "../../../shared/database/prisma";
import { produtos } from "@prisma/client";
import { IProductRepository } from "../interfaces/IProductRepository";

export class ProductRepository implements IProductRepository {
    async findByName(nome: string): Promise<produtos | null> {
        const product = await prisma.produtos.findFirst({
            where: {
                nome,
            },
        });

        return product;
    }

    async create(nome: string,descricao: string | null,preco: number,categoria_id: string,marca_id: string): Promise<produtos> {
        const product = await prisma.produtos.create({
            data: {
                categoria_id,
                marca_id,
                nome,
                descricao,
                preco,
            },
        });

        return product;
    }

    async findAll(): Promise<produtos[]> {
        const products = await prisma.produtos.findMany();

        return products;
    }

    async findById(id: string): Promise<produtos | null> {
        const product = await prisma.produtos.findUnique({
            where: {
                id,
            },
        });

        return product;
    }

    async delete(id: string): Promise <void> {
        await prisma.produtos.delete({
            where: {
                id,
            },
        });


    }

    async update(id: string,nome: string,descricao: string | null,preco: number,categoria_id: string,marca_id: string): Promise<produtos> {
        const product = await prisma.produtos.update({
            where: {
                id,
            },
            data: {
                nome,
                descricao,
                preco,
                categoria_id,
                marca_id,
            },
        });

        return product;
    }


}