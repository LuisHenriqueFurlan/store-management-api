import { FastifyInstance } from "fastify";
import { SaleItemController } from "../controllers/SalesItemController";

export async function saleItemsRoutes(app: FastifyInstance) {
    const controller = new SaleItemController();
    app.post("/sale-items", controller.create);
    app.get("/sale-items", controller.list);
    app.get("/sale-items/:id", controller.findById);
    app.put("/sale-items/:id", controller.update);
    app.delete("/sale-items/:id", controller.delete);
}
