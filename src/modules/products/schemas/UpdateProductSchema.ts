import { z } from "zod";

export const updateProductSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(3, "O nome deve possuir pelo menos 3 caracteres."),

    descricao: z
        .string()
        .trim()
        .min(5, "A descrição deve possuir pelo menos 5 caracteres."),

    preco: z
        .number()
        .positive("O preço deve ser maior que zero."),

    categoria_id: z
        .uuid("Categoria inválida."),

    marca_id: z
        .uuid("Marca inválida."),
});