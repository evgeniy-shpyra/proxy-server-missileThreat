import alarm from "./api/alarm.js"

const queueFactory = (taskStorage) => {
  const alarmApi = alarm()

  let interval = null
  return {
    start: async (timeInterval = 60_000) => {
      if (interval) clearInterval(interval)
      interval = setInterval(async () => {
        const response = await alarmApi.getActive()
        console.log({ response })
      }, timeInterval)
    },
    stop: () => {
      if (interval) clearInterval(interval)
    },
  }
}

export default queueFactory
