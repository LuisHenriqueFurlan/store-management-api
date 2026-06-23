import { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/CategoryController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";

export async function categoriesRoutes(app: FastifyInstance) {
  const categoryController = new CategoryController();
  app.post("/categories",{preHandler: ensureAuthenticated,}, categoryController.create);
  app.get("/categories",{preHandler: ensureAuthenticated,}, categoryController.list);
  app.delete("/categories/:id",{ preHandler: ensureAuthenticated },categoryController.delete);
  app.get("/categories/:id",{ preHandler: ensureAuthenticated },categoryController.findById);
}