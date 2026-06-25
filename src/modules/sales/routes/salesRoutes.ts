import { FastifyInstance } from "fastify";
import { SalesController } from "../controllers/SalesController";

export async function salesRoutes(app: FastifyInstance) {
    const controller = new SalesController();

    app.post("/sales", controller.create);
    app.get("/sales", controller.list);
    app.get("/sales/:id", controller.findById);
}