import { Sequelize } from 'sequelize'
import HistoryModel from './models/HistoryModel.js'
import RegionModel from './models/RegionModel.js'
import StatusModel from './models/StatusModel.js'
import setupDb from './setup.js'

const db = async (connectionData) => {
  try {
    const { password, user, port, name, host } = connectionData

    const sequelize = new Sequelize(
      `postgres://${user}:${password}@${host}:${port}/${name}`
    )

    await sequelize.authenticate()

    // init models
    const History = await HistoryModel(sequelize)
    const Region = await RegionModel(sequelize)
    const Status = await StatusModel(sequelize)

    Region.hasMany(History, { onDelete: 'cascade' })
    History.belongsTo(Region)
    Status.hasMany(History, { onDelete: 'cascade' })
    History.belongsTo(Status)


    // await sequelize.sync({ force: true })
    await sequelize.sync({ alter: true });

    await setupDb(sequelize)

    console.log('Db has been started')
  } catch (error) {
    console.error('DB error:', error)
    process.exit(1)
  }
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
