import crypto from 'node:crypto'

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

const statusesData = [
  { id: 1, name: 'Повітряна тривога активна в усій області' },
  { id: 2, name: 'Часткова тривога в районах чи громадах' },
  { id: 3, name: 'Немає інформації про повітряну тривогу' },
]

const setupDb = async (sequelize) => {
  const RegionModel = sequelize.models.region
  const StatusModel = sequelize.models.status
  const HomeModel = sequelize.models.home

  for (const region of regionsData) {
    const count = await RegionModel.count({
      where: {
        external_id: region.id,
      },
    })

    if (!count) {
      await RegionModel.create({ name: region.name, external_id: region.id })
    }
  }

  for (const status of statusesData) {
    const count = await StatusModel.count({
      where: {
        external_id: status.id,
      },
    })

    if (!count) {
      await StatusModel.create({ name: status.name, external_id: status.id })
    }
  }

  // generate uuid
  if ((await HomeModel.count()) === 0) {
    await HomeModel.create({ token: await crypto.randomUUID(), regionId: regionsData[0].id })
    await HomeModel.create({ token: await crypto.randomUUID(), regionId: regionsData[0].id })
    await HomeModel.create({ token: await crypto.randomUUID(), regionId: regionsData[1].id })
    await HomeModel.create({ token: await crypto.randomUUID(), regionId: regionsData[2].id })
    await HomeModel.create({ token: await crypto.randomUUID(), regionId: regionsData[3].id })
  }
}

export default setupDb
