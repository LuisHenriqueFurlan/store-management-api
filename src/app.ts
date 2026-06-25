import Fastify from "fastify";
import { usersRoutes } from "./modules/users/routes/usersRoutes";
import { categoriesRoutes } from "./modules/categories/routes/categoriesRoutes";
import { productsRoutes } from "./modules/products/routes/productsRoutes";
import { brandsRoutes } from "./modules/brands/routes/brandsRoutes";
import { productVariationRoutes } from "./modules/productVariations/routes/productVariationRoutes";
import { salesRoutes } from "./modules/sales/routes/salesRoutes";
import { saleItemsRoutes } from "./modules/saleItems/routes/salesItemsRoutes";

export const app = Fastify({
  logger: true,
});


app.register(usersRoutes);
app.register(categoriesRoutes);
app.register(productsRoutes);
app.register(brandsRoutes);
app.register(productVariationRoutes);
app.register(salesRoutes);
app.register(saleItemsRoutes);