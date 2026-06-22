import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";

export async function usersRoutes(app: FastifyInstance) {
  const userController = new UserController();
  const authenticateUserController = new AuthenticateUserController();

  app.post("/users", userController.create);
  app.post("/sessions", authenticateUserController.authenticate);

  app.get(
    "/profile",
    {
      preHandler: ensureAuthenticated,
    },
    async () => {
      return {
        message: "Você está autenticado",
      };
    }
  );
}