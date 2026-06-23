import Fastify from "fastify";
import { usersRoutes } from "./modules/users/routes/usersRoutes";
import { categoriesRoutes } from "./modules/categories/routes/categoriesRoutes";
import { productsRoutes } from "./modules/products/routes/productsRoutes";

export const app = Fastify({
  logger: true,
});


app.register(usersRoutes);
app.register(categoriesRoutes);
app.register(productsRoutes);
