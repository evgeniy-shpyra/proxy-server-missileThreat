import { DataTypes } from 'sequelize'

const HomeModel = async (sequelize) => {
  const Home = await sequelize.define('home', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    regionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  return Home
}

export default HomeModel
