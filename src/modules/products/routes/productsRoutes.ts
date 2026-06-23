import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/ProductController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";

export async function productsRoutes(app: FastifyInstance) {
    const productController = new ProductController();

    app.post("/products",{preHandler: ensureAuthenticated,},productController.create);
    app.get("/products",{preHandler: ensureAuthenticated,},productController.list);
    app.get("/products/:id",{preHandler: ensureAuthenticated,},productController.findById);
    app.delete("/products/:id",{preHandler: ensureAuthenticated,},productController.delete);
    app.put("/products/:id",{preHandler: ensureAuthenticated,},productController.update);
}

