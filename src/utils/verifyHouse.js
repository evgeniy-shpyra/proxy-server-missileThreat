const verifyHouse = async (token, dbHomeHandler) => {
  const home = await dbHomeHandler.get({
    token,
  })

  return home ? true : false
}

export default verifyHouse