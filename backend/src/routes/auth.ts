import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default async function authRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body as any;

    if (email === 'admin@tracker.com' && password === 'admin123') {
      return reply.status(200).send({
        token: 'fake-jwt-token-chevrolet-tracker-2026',
        message: 'Autenticación exitosa',
      });
    }

    return reply.status(401).send({
      message: 'Credenciales incorrectas.',
    });
  });
}
