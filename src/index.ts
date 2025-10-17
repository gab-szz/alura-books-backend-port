// index.ts
import Fastify from "fastify";
import { registrarModulos } from "./modules/module.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(registrarModulos);

fastify.listen({ port: 3000 }, function (err, _address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
