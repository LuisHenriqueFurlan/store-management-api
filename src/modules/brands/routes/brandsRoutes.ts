import { FastifyInstance } from "fastify";
import { BrandController } from "../controllers/brandController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";


export async function brandsRoutes(app: FastifyInstance) {
    app.addHook("preHandler", ensureAuthenticated);
    const brandController = new BrandController();
    app.post("/brands",brandController.create);
    app.get("/brands",brandController.list);
    app.get("/brands/:id",brandController.findById);
    app.put("/brands/:id",brandController.update);
    app.delete("/brands/:id",brandController.delete);
    
}
