import { Sequelize } from 'sequelize'
import HistoryModel from './models/HistoryModel.js'
import RegionModel from './models/RegionModel.js'
import StatusModel from './models/StatusModel.js'
import setupDb from './setup.js'
import createCrud from './createCrud.js'
import HomeModel from './models/HomeModel.js'

const db = (connectionData) => {
  const { password, user, port, name, host } = connectionData

  const sequelize = new Sequelize(
    `postgres://${user}:${password}@${host}:${port}/${name}`
  )

  return {
    start: async () => {
      try {
        await sequelize.authenticate()

        // init models
        const History = await HistoryModel(sequelize)
        const Region = await RegionModel(sequelize)
        const Status = await StatusModel(sequelize)
        const Home = await HomeModel(sequelize)

        Region.hasMany(History, { onDelete: 'cascade', foreignKey: 'regionId', sourceKey: "external_id"})
        History.belongsTo(Region,)
        Status.hasMany(History, { onDelete: 'cascade', foreignKey: 'statusId', sourceKey: "external_id" })
        History.belongsTo(Status,)
        Region.hasMany(Home, { onDelete: 'cascade', foreignKey: 'regionId',  sourceKey: "external_id" })
        Home.belongsTo(Region,)

        // await sequelize.sync({ force: true })
        await sequelize.sync({ alter: true })

        await setupDb(sequelize)

        console.log('Db has been started')
        // create handlers
        const handlers = {
          history: createCrud(History),
          status: createCrud(Status),
          region: createCrud(Region),
          home: createCrud(Home),
        }

        return handlers
      } catch (error) {
        console.error('DB error:', error)
        process.exit(1)
      }
    },
    stop: async () => {
      if (sequelize) {
        await sequelize.close()
        console.log('Db has been stopped')
      }
    },
  }
}

export default db
