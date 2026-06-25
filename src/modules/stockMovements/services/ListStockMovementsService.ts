import { IStockMovementRepository } from "../interfaces/IStockMovementRepository";

export class ListStockMovementsService {
    constructor(private stockMovementRepository: IStockMovementRepository) {}

    async execute() {
        const movements = await this.stockMovementRepository.findAll();

        return movements;
    }
}