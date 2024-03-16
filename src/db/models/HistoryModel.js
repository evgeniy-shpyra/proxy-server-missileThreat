import { DataTypes } from 'sequelize'

const HistoryModel = (sequelize) => {
  const History = sequelize.define(
    'history',
    {
      regionId: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      statusId: {
        type: DataTypes.NUMBER,
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
