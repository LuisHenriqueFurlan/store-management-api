import { FastifyInstance } from "fastify";
import { PaymentController } from "../controllers/PaymentController";

export async function paymentsRoutes(app: FastifyInstance) {
    const controller = new PaymentController();
    app.post("/payments", controller.create);
    app.get("/payments", controller.list);
    app.get("/payments/:id", controller.findById);
    app.put("/payments/:id", controller.update);
    app.delete("/payments/:id", controller.delete);
}