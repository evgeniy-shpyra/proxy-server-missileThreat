import DB from './db/index.js'
import alarmInterviewerFactory from './services/alarmInterviewer.js'
import config from './config.json' assert { type: 'json' };

const app = async () => {

  try {
    const db = DB(config.db)
    const dbHandlers = await db.start()

    const handleFetchAlarms = (data) => {
      console.log(data)
    }

    const alarmInterviewer = alarmInterviewerFactory(handleFetchAlarms, config.alarm)
    alarmInterviewer.start()

    const shutdownMaxWait = 3000

    process.on("SIGINT", shutdown)
    process.on("SIGTERM", shutdown)

    function shutdown() {
      console.log("closing with grace...")
      alarmInterviewer.stop()
      db.stop()

      setTimeout(() => process.exit(1), shutdownMaxWait).unref()
    }
  } catch (e) {
    console.log(e)
  }
}

app()
