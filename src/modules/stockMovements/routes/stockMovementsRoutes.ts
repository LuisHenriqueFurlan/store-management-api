import { FastifyInstance } from "fastify";
import { StockMovementController } from "../controllers/StockMovementController";

export async function stockMovementsRoutes(app: FastifyInstance) {
    const controller = new StockMovementController();
    app.post("/stock-movements", controller.create);
    app.get("/stock-movements", controller.list);
    app.get("/stock-movements/:id", controller.findById);
}