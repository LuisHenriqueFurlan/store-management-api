import { FastifyInstance } from "fastify";
import { StockMovementController } from "../controllers/StockMovementController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";


export async function stockMovementsRoutes(app: FastifyInstance) {
    app.addHook("preHandler", ensureAuthenticated);
    const controller = new StockMovementController();
    app.post("/stock-movements", controller.create);
    app.get("/stock-movements", controller.list);
    app.get("/stock-movements/:id", controller.findById);
}