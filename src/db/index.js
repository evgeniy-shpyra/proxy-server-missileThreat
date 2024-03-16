import { Sequelize } from 'sequelize'
import HistoryModel from './models/HistoryModel.js'
import RegionModel from './models/RegionModel.js'
import StatusModel from './models/StatusModel.js'

const db = async (connectionData) => {
  const { password, user, port, name, host } = connectionData

  const sequelize = new Sequelize(
    `postgres://${user}:${password}@${host}:${port}/${name}`
  )

  // testing the connection
  try {
    await sequelize.authenticate()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1)
  }

  // init models
  const History = HistoryModel(sequelize)
  const Region = RegionModel(sequelize)
  const Status = StatusModel(sequelize)

  Region.hasMany(History)
  History.belongsTo(Region)

  Status.hasMany(History)
  History.belongsTo(Status)

  await setupDb(sequelize)

  await sequelize.sync({ force: true })
  // await sequelize.sync({ alter: true });

  return {
    start: (opt = {}) => {},
    stop: () => {
      if (db) {
        db.close()
        console.log('Db was closed')
      }
    },
  }
}

export default db
