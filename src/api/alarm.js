const regionsData = [
  { id: 29, name: 'Автономна Республіка Крим' },
  { id: 8, name: 'Волинська область' },
  { id: 4, name: 'Вінницька область' },
  { id: 9, name: 'Дніпропетровська область' },
  { id: 28, name: 'Донецька область' },
  { id: 10, name: 'Житомирська область' },
  { id: 11, name: 'Закарпатська область' },
  { id: 12, name: 'Запорізька область' },
  { id: 13, name: 'Івано-Франківська область' },
  { id: 31, name: 'м. Київ' },
  { id: 14, name: 'Київська область' },
  { id: 15, name: 'Кіровоградська область' },
  { id: 16, name: 'Луганська область' },
  { id: 27, name: 'Львівська область' },
  { id: 17, name: 'Миколаївська область' },
  { id: 18, name: 'Одеська область' },
  { id: 19, name: 'Полтавська область' },
  { id: 5, name: 'Рівненська область' },
  { id: 30, name: 'м. Севастополь' },
  { id: 20, name: 'Сумська область' },
  { id: 21, name: 'Тернопільська область' },
  { id: 22, name: 'Харківська область' },
  { id: 23, name: 'Херсонська область' },
  { id: 3, name: 'Хмельницька область' },
  { id: 24, name: 'Черкаська область' },
  { id: 26, name: 'Чернівецька область' },
  { id: 25, name: 'Чернігівська область' },
]

const statusesDto = {
  A: { id: 1, name: 'Повітряна тривога активна в усій області' },
  P: { id: 2, name: 'Часткова тривога в районах чи громадах' },
  N: { id: 3, name: 'Немає інформації про повітряну тривогу' },
}

const convertActiveResponse = (data) => {
  const states = data.split('')

  const convertedData = states.map((s, index) => {
    const regionId = regionsData[index].id
    const statusId = statusesDto[s].id

    return {
      regionId,
      statusId
    }
  })
  return convertedData
}

const api = (token) => {
  const url = 'https://api.alerts.in.ua/v1'

  if (!token) {
    console.error(`Can't init alarmApi`)
    process.exit(1)
  }

  return {
    getActive: async () => {
      const route = 'iot/active_air_raid_alerts_by_oblast.json'

      try {
        const response = await fetch(`${url}/${route}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        })

        const data = await response.json()

        if (response.status !== 200)
          throw new Error(
            JSON.stringify({ message: data.message, status: response.status })
          )

        const convertedResponse = convertActiveResponse(data)
        return convertedResponse
      } catch (e) {
        console.error('Alarm api error', e)
        return null
      }
    },
  }
}

export default api
