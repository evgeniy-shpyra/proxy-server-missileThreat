const api = () => {
  const url = "https://api.alerts.in.ua/v1"
  const token = process.env.ALARM_API_TOKEN
  if(!token){
    console.error(`Can't init alarmApi, ALARM_API_TOKEN should be in .env`)
    process.exit(1)
  }


  return {
    getActive: async () => {
      const route = "iot/active_air_raid_alerts_by_oblast.json"

      try {
        const response = await fetch(`${url}/${route}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        return data
      } catch (e) {
        console.error("error", e)
        return null
      }
    },
  }
}

export default api
