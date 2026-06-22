import Fastify from "fastify";
import { usersRoutes } from "./modules/users/routes/usersRoutes";

export const app = Fastify({
  logger: true,
});


app.register(usersRoutes);
