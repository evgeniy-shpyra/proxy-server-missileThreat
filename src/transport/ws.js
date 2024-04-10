import websocket from '@fastify/websocket'
import verifyHouse from '../utils/verifyHouse.js'

const initWebsocket = async (server, dbHandlers) => {
  await server.register(websocket, {
    errorHandler: function (error, socket, req, reply) {
      socket.terminate()
    },
    options: {
      maxPayload: 1048576, // messages size: 1 MiB
      verifyClient: async (info, next) => {
        const authorization =
          info.req.headers['authorization']?.split(' ') || []
        const isVerified =
          authorization.length === 2 &&
          (await verifyHouse(authorization[1], dbHandlers.home))

        next(isVerified)
      },
    },
  })

  const subscribes = {}

    server.get('/alarm', { websocket: true }, async (socket, request) => {
      const token = request.headers['authorization'].split(' ')[1]

      subscribes[token] = socket

      try {
        socket.on('close', () => {
          console.log('close')
          subscribes[token] && delete subscribes[token]
        })
      } catch (e) {
        console.log('Ws error', e)
      }
    })

  const sendStatus = async (regionId, isDanger) => {
    const houses = await dbHandlers.home.getAll({ regionId })

    for(const house of houses){
      if(!subscribes[house.token]) continue
      
      const data = {action: "status", isDanger}

      subscribes[house.token].send(JSON.stringify(data))
      console.log({...data, token: house.token})
    }
    
  }

  return { sendStatus }
}

export default initWebsocket
