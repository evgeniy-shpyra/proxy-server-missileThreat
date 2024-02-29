import alarmApi from "./api/alarm.js"
import dbFactory from "./db/dbFactory.js"
import taskModel from "./db/models/taskModel.js"
import queueFactory from "./queue.js"

const app = async () => {
  const db = dbFactory({ taskModel })

  const dbHandlers = await db.start()
  const queue = queueFactory()
  queue.start()

  const shutdownMaxWait = 1000

  process.on("SIGINT", shutdown)
  process.on("SIGTERM", shutdown)

  function shutdown() {
    console.log("closing with grace...")
    queue.stop()

    setTimeout(() => process.exit(1), shutdownMaxWait).unref()
  }
}

app()
