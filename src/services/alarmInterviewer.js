import alarm from '../api/alarm.js'
import wait from '../utils/wait.js'

const alarmInterviewer = (callback, { interval, apiToken }) => {

  const alarmApi = alarm(apiToken)

  let isWork = false

  return {
    start: async () => {
      isWork = true
      const time = new Date()

      while (isWork) {
        if (Date.now() >= time) {
          const data = await alarmApi.getActive()
          if (!data) continue
          
          callback && callback(data)
          time.setMilliseconds(time.getMilliseconds() + interval)
        }

        if(!isWork) break
        await wait(1000)
      }
      console.log('Alarm has been stopped')
    },
    stop: () => {
      isWork = false
    },
  }
}

export default alarmInterviewer
