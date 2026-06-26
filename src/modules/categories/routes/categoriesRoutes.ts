import { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/CategoryController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";

export async function categoriesRoutes(app: FastifyInstance) {
  app.addHook("preHandler", ensureAuthenticated);
  const categoryController = new CategoryController();
  app.post("/categories", categoryController.create);
  app.get("/categories", categoryController.list);
  app.delete("/categories/:id",categoryController.delete);
  app.get("/categories/:id",categoryController.findById);
}