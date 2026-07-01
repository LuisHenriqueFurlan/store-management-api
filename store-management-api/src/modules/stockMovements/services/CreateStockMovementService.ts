import { IStockMovementRepository } from "../interfaces/IStockMovementRepository";

export class CreateStockMovementService {
    constructor(private stockMovementRepository: IStockMovementRepository) {}

    async execute(
        produto_variacao_id: string,
        usuario_id: string,
        tipo: string,
        quantidade: number,
        observacao?: string
    ) {

        const movement = await this.stockMovementRepository.create(
            produto_variacao_id,
            usuario_id,
            tipo,
            quantidade,
            observacao
        );

        return movement;
    }
}