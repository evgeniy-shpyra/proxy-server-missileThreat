import DB from './db/index.js'
import alarmInterviewerFactory from './services/alarmInterviewer.js'

const dbConnection = {
  password: process.env.POSTGRES_PASSWORD,
  user: process.env.POSTGRES_USER,
  port: process.env.POSTGRES_PORT,
  name: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
}

const app = async () => {
  try {
    const db = await DB(dbConnection)


    // const dbHandlers = await db.start()
    // const alarmInterviewer = alarmInterviewerFactory()
    // alarmInterviewer.start()

    // const shutdownMaxWait = 3000

    // process.on("SIGINT", shutdown)
    // process.on("SIGTERM", shutdown)

    // function shutdown() {
    //   console.log("closing with grace...")
    //   alarmInterviewer.stop()

    //   setTimeout(() => process.exit(1), shutdownMaxWait).unref()
    // }
  } catch (e) {
    console.log(e)
  }
}

app()
