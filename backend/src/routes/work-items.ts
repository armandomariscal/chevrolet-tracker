import { FastifyInstance } from 'fastify'

export default async function (fastify: FastifyInstance) {

    // GET list
    fastify.get('/work-items', async (request) => {
        const { limit = 20, offset = 0 } = request.query as any

        const [data, total] = await Promise.all([
            fastify.prisma.workItem.findMany({
                skip: Number(offset),
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
                include: {
                    tags: true
                }
            }),
            fastify.prisma.workItem.count()
        ])

        return {
            data,
            total_count: total
        }
    })

    // GET detail
    fastify.get('/work-items/:id', async (request) => {
        const { id } = request.params as any

        return fastify.prisma.workItem.findUnique({
            where: { id },
            include: {
                pullRequests: true,
                notes: true,
                tags: true
            }
        })
    })

    // CREATE
    fastify.post('/work-items', async (request) => {
        const body = request.body as any

        return fastify.prisma.workItem.create({
            data: body
        })
    })

    // UPDATE
    fastify.patch('/work-items/:id', async (request) => {
        const { id } = request.params as any
        const body = request.body as any

        return fastify.prisma.workItem.update({
            where: { id },
            data: body
        })
    })

    // DELETE
    fastify.delete('/work-items/:id', async (request) => {
        const { id } = request.params as any

        await fastify.prisma.workItem.delete({
            where: { id }
        })

        return { success: true }
    })
}