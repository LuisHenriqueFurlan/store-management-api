import { IStockMovementRepository } from "../interfaces/IStockMovementRepository";

export class FindStockMovementByIdService {
    constructor(private stockMovementRepository: IStockMovementRepository) {}

    async execute(id: string) {

        const movement = await this.stockMovementRepository.findById(id);

        if (!movement) {
            throw new Error("Movimentação não encontrada.");
        }

        return movement;
    }
}