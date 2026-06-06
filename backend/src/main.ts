import Fastify from 'fastify';
import cors from '@fastify/cors';
import prisma from './lib/prisma.js';
import authRoutes from './routes/auth.js';

const app = Fastify({ logger: true });

app.register(cors, {
  origin: true,
});

app.get('/', async () => {
  return { message: 'API running' };
});

app.register(authRoutes, { prefix: '/api/auth' });

app.get('/api/work-items', async (request, reply) => {
  try {
    const items = await prisma.workItem.findMany({
      include: {
        pullRequests: true,
        notes: true,
        tags: true,
      },
    });
    return items;
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Error fetching data' });
  }
});

const start = async () => {
  try {
    console.log(app.printRoutes());

    await app.listen({
      port: 3000,
      host: '0.0.0.0',
    });

    console.log('Server running on http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
