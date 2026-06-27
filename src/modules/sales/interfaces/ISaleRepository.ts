import { vendas } from "@prisma/client";


export interface ISalesRepository {
    findById(id: string): Promise<vendas | null>;
    findAll(): Promise<vendas[]>;
    create(
        usuario_id:string,
        status:string,
    ): Promise<vendas>;
    updateTotals(
    id: string,
    valor_bruto: number,
    valor_desconto: number,
    valor_final: number
): Promise<vendas>;
    updateStatus(
    id: string,
    status: string
): Promise<vendas>;
 
}