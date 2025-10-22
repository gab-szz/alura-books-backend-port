// index.ts
import Fastify from "fastify";
import cors from "@fastify/cors";
import { registrarModulos } from "./modules/module.js";

const fastify = Fastify({
  logger: true,
});

// Registrar CORS aberto (qualquer origem, qualquer método)
fastify.register(cors, {
  origin: true, // permite qualquer origem
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

fastify.register(registrarModulos);

fastify.listen({ port: 3000 }, function (err, _address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
