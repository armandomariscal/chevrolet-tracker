import 'dotenv/config'
console.log('DATABASE_URL:', process.env.DATABASE_URL)
import Fastify from 'fastify'
import prismaPlugin from './plugins/prisma'
import workItemsRoutes from './routes/work-items'
import cors from '@fastify/cors'

const app = Fastify({ logger: true })

app.register(cors, {
    origin: true
})

app.register(prismaPlugin)
app.register(workItemsRoutes)

app.listen({ port: 3000, host: '0.0.0.0' })