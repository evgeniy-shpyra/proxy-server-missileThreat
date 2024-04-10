import DB from './db/index.js'
import alarmInterviewerFactory from './services/alarmInterviewer.js'
import config from '../config.json' assert { type: 'json' }
import Server from './transport/server.js'
import initWebsocket from './transport/ws.js'
import { missileDangerStatus } from './api/alarm.js'

const app = async () => {
  try {
    // db
    const db = DB(config.db)
    const dbHandlers = await db.start()

    // server
    const server = Server(config.server)
    const wsHandlers = await initWebsocket(server.server, dbHandlers)

    await server.start()

    const handleFetchAlarms = async (data) => {
      
      for (const item of data) {
        const isDanger = item.statusId === missileDangerStatus
        wsHandlers.sendStatus(item.regionId, isDanger)
      }

      await dbHandlers.history.bulkCreate(data)
    }

    // fetch alarms
    const alarmInterviewer = alarmInterviewerFactory(
      handleFetchAlarms,
      config.alarm
    )
    alarmInterviewer.start()

    // grace shutdown
    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
    function shutdown() {
      console.log('closing with grace...')
      // alarmInterviewer.stop()
      db.stop()
      server.stop()

      setTimeout(() => process.exit(1), config.app.shutdownMaxWait).unref()
    }
  } catch (e) {
    console.log(e)
  }
}

app()
