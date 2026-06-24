import { FastifyInstance } from "fastify";
import { ProductVariationController } from "../controllers/ProductVariationController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";

export async function productVariationRoutes(app: FastifyInstance) {
    const productVariationController = new ProductVariationController();

    app.post("/variations",{ preHandler: ensureAuthenticated },productVariationController.create);
    app.get("/variations",{ preHandler: ensureAuthenticated },productVariationController.list);
    app.get("/variations/:id",{ preHandler: ensureAuthenticated },productVariationController.findById);
    app.put("/variations/:id",{ preHandler: ensureAuthenticated },productVariationController.update);
    app.delete("/variations/:id",{ preHandler: ensureAuthenticated },productVariationController.delete);
}