import { DataTypes } from "sequelize"

const StatusModel = async (sequelize) => {
  const Status = sequelize.define(
    'status',
    {
      name: {
        type: DataTypes.String,
        allowNull: false
      },
      
    },
    {
      updatedAt: false
    }
  )

  return Status
}

export default StatusModel
