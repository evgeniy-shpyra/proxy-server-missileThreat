import alarm from "../api/alarm.js"
import wait from "../utils/wait.js"

const alarmInterviewer = () => {
  const alarmApi = alarm()

  let isWork = false

  return {
    start: async (interval = 20_000) => {
      isWork = true
      const time = new Date()

      while (isWork) {
        if (Date.now() >= time) {
          const data = await alarmApi.getActive()
          console.log(data)
          time.setMilliseconds(time.getMilliseconds() + interval)
        }

        await wait(1000)
      }
    },
    stop: () => {
      isWork = false
    },
  }
}

export default alarmInterviewer
