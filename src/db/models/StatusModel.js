import { DataTypes } from 'sequelize'

const StatusModel = async (sequelize) => {
  const Status = await sequelize.define(
    'status',
    {
      external_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      updatedAt: false,
    }
  )

  return Status
}

export default StatusModel
