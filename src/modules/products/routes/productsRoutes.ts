import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/ProductController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";

export async function productsRoutes(app: FastifyInstance) {

    app.addHook("preHandler", ensureAuthenticated);
    const controller = new ProductController();
    app.post("/products", controller.create);
    app.get("/products", controller.list);
    app.get("/products:id", controller.findById);
    app.put("/products:id", controller.update);
    app.delete("/products:id", controller.delete);

}

