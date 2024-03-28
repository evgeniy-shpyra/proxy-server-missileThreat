const createCrud = (Model) => {
  return {
    bulkCreate: async (payload) => {
      const data = await Model.bulkCreate(payload)
      return data
    },
    create: async (payload) => {
      const data = await Model.create(payload)
      return data
    },
    getAll: async (where) => {
      const queryParams = {
        row: true
      }
      if(where){
        queryParams.where = where
      }
      const data = await Model.findAll(queryParams)
      return data
    },
    get: async (where) => {
      const data = await Model.findOne({ where })
      return data
    },
  }
}

export default createCrud
