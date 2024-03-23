import { DataTypes } from 'sequelize'

const HistoryModel = async (sequelize) => {
  const History = await sequelize.define(
    'history',
    {
      regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      updatedAt: false,
    }
  )

  return History
}

export default HistoryModel
