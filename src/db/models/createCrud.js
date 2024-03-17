const createCrud = (Model) => ({
  create: async (payload) => {
    const data = await Model.create(payload)
    return data
  },
  getAll: async () => {
    const data = await Model.findAll({row: true})
    return data
  }
})

export default createCrud