import { FastifyInstance } from "fastify";
import { SaleItemController } from "../controllers/SalesItemController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";

export async function saleItemsRoutes(app: FastifyInstance) {
    app.addHook("preHandler", ensureAuthenticated);
    const controller = new SaleItemController();
    app.post("/sale-items", controller.create);
    app.get("/sale-items", controller.list);
    app.get("/sale-items/:id", controller.findById);
    app.put("/sale-items/:id", controller.update);
    app.patch("/sale-items/:id", controller.update);
    app.delete("/sale-items/:id", controller.delete);
}
