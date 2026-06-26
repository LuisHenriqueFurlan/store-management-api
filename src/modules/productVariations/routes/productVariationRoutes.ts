import { FastifyInstance } from "fastify";
import { ProductVariationController } from "../controllers/ProductVariationController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";


export async function productVariationRoutes(app: FastifyInstance) {
    app.addHook("preHandler", ensureAuthenticated);
    const productVariationController = new ProductVariationController();
    app.post("/variations",productVariationController.create);
    app.get("/variations",productVariationController.list);
    app.get("/variations/:id",productVariationController.findById);
    app.put("/variations/:id",productVariationController.update);
    app.delete("/variations/:id",productVariationController.delete);
}