import Fastify from 'fastify'
import websocket from '@fastify/websocket'

const server = (opt = {}) => {
  const host = opt.host
  const port = opt.port

  const fastify = Fastify({ logger: false })

  fastify.register(websocket)
  fastify.register(async function (fastify) {
    fastify.get('/ws', { websocket: true }, (socket, req) => {
      socket.on('message', (message) => {
        console.log('ws:', message)
        socket.send('hi from server')
      })
    })
  })

  fastify.get('/', async function handler(request, reply) {
    console.log('get')
    return { hello: 'world' }
  })

  return {
    start: async () => {
      try {
        await fastify.listen({ port, host })
        console.log(`Server running at port: ${port}`)
      } catch (err) {
        console.log('An error occurred while starting the server', err)
        process.exit(1)
      }
    },
    stop: async () => {
      await fastify.close()
      console.log('Server has been stopped')
    },
  }
}

export default server
