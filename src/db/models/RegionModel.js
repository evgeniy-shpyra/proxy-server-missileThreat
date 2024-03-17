import { DataTypes } from 'sequelize'

const RegionModel = async (sequelize) => {
  const Region = await sequelize.define(
    'region',
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

  return Region
}

export default RegionModel
