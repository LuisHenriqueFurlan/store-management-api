import { FastifyInstance } from "fastify";
import { BrandController } from "../controllers/brandController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";

export async function brandsRoutes(app: FastifyInstance) {
    const brandController = new BrandController();

    app.post("/brands",{ preHandler: ensureAuthenticated },brandController.create);
    app.get("/brands",brandController.list);
    app.get("/brands/:id",brandController.findById);
    app.put("/brands/:id",{ preHandler: ensureAuthenticated },brandController.update);
    app.delete("/brands/:id",{ preHandler: ensureAuthenticated },brandController.delete);
    
}