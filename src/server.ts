import { app } from "./app.js";

async function bootstrap() {
  try {
    await app.listen({
      port: 3333,
      host: "0.0.0.0",
    });

    console.log("Servidor iniciado");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

bootstrap();