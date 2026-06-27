import { FastifyInstance } from "fastify";
import { SalesController } from "../controllers/SalesController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";


export async function salesRoutes(app: FastifyInstance) {
    app.addHook("preHandler", ensureAuthenticated);
    const controller = new SalesController();
    app.post("/sales", controller.create);
    app.get("/sales", controller.list);
    app.get("/sales/:id", controller.findById);
    app.patch("/sales/:id/finalize", controller.finalize);
    app.patch(
    "/sales/:id/cancel",controller.cancel.bind(controller));
    
}