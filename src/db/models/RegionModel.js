import { DataTypes } from "sequelize"

const RegionModel = async (sequelize) => {
  const Region = sequelize.define(
    'region',
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

  return Region
}

export default RegionModel
