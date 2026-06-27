import { FastifyRequest, FastifyReply } from "fastify";
import { SaleItemRepository } from "../repositories/SalesItemRepository";
import { ProductVariationRepository } from "../../productVariations/repositories/ProductVariationRepository";
import { SalesRepository } from "../../sales/repositories/salesRepository";
import { StockMovementRepository } from "../../stockMovements/repositories/StockMovementRepository";
import { CreateSaleItemService } from "../services/CreateSaleItemService";
import { ListSaleItemService } from "../services/ListSaleItemService";
import { FindSaleItemByIdService } from "../services/FindSaleItemByIdService";
import { UpdateSaleItemService } from "../services/UpdateSaleItemService";
import { DeleteSaleItemService } from "../services/DeleteSaleItemService";
import { RecalculateSaleTotalsService } from "../../sales/services/RecalculateSaleTotalsService";
import { ProcessSaleItemService } from "../../sales/services/ProcessSaleItemService";
import { CreateStockMovementService } from "../../stockMovements/services/CreateStockMovementService";
import { createSaleItemSchema } from "../schemas/CreateSaleItemSchema";
import { updateSaleItemSchema } from "../schemas/UpdateSaleItemSchema";
import { saleItemIdSchema } from "../schemas/SaleItemIdSchema";

export class SaleItemController {

    async create(request: FastifyRequest, reply: FastifyReply) {

        const data = createSaleItemSchema.parse(request.body);

        const saleItemRepository = new SaleItemRepository();
        const productVariationRepository = new ProductVariationRepository();
        const saleRepository = new SalesRepository();
        const stockMovementRepository = new StockMovementRepository();

        const recalculateSaleTotalsService = new RecalculateSaleTotalsService(saleRepository, saleItemRepository);

        const createSaleItemService =new CreateSaleItemService(saleItemRepository, productVariationRepository, recalculateSaleTotalsService);

        const createStockMovementService = new CreateStockMovementService(stockMovementRepository);

        const processSaleItemService =new ProcessSaleItemService(createSaleItemService,createStockMovementService,productVariationRepository, saleRepository);

        const item = await processSaleItemService.execute(
            data.venda_id,
            data.produto_variacao_id,
            data.quantidade,
            data.desconto_percentual,
            request.user.id
        );

        return reply.status(201).send(item);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {

        const repository = new SaleItemRepository();
        const service = new ListSaleItemService(repository);

        const items = await service.execute();

        return reply.send(items);
    }

    async findById(request: FastifyRequest, reply: FastifyReply) {

        const { id } = saleItemIdSchema.parse(request.params);

        const repository = new SaleItemRepository();
        const service = new FindSaleItemByIdService(repository);

        const item = await service.execute(id);

        return reply.send(item);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {

        const { id } = saleItemIdSchema.parse(request.params);

        const data = updateSaleItemSchema.parse(request.body);

        const saleItemRepository = new SaleItemRepository();
        const productVariationRepository = new ProductVariationRepository();
        const salesRepository = new SalesRepository();

        const recalculateSaleTotalsService = new RecalculateSaleTotalsService(salesRepository,saleItemRepository);

        const service = new UpdateSaleItemService(saleItemRepository,productVariationRepository,salesRepository,recalculateSaleTotalsService);

        const item = await service.execute(
            id,
            data.quantidade,
            data.desconto_percentual
        );

        return reply.send(item);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {

        const { id } = saleItemIdSchema.parse(request.params);

        const saleItemRepository = new SaleItemRepository();
        const salesRepository = new SalesRepository();

        const recalculateSaleTotalsService = new RecalculateSaleTotalsService(salesRepository,saleItemRepository);

        const service =new DeleteSaleItemService(saleItemRepository,salesRepository, recalculateSaleTotalsService);

        const result = await service.execute(id);

        return reply.send(result);
    }
}