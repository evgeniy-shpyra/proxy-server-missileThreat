const api = () => {
  return {
    postAlarm: async ({ data, ip }) => {
      const route = "/alarm-status"
      try {
        const responseJson = await fetch(`http://${ip}${route}`, {
          method: "POST",
          data: JSON.stringify(data),
        })
        const response = await responseJson.json()

        return response
      } catch (e) {}
    },
  }
}

export default api
