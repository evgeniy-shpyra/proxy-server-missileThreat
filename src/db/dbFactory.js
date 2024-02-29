import Database from "better-sqlite3"

const dbFactory = (models = {}) => {
  let db = null
  return {
    start: (opt = {}) => {
      db = new Database("query.db", opt)
      db.pragma("journal_mode = WAL")

      if (!db.open) throw new Error("Can't start db")

      const handlers = {}

      for (const key in models) {
        handlers[key] = models[key](db)
      }

      return handlers
    },
    stop: () => {
      if (db) {
        db.close()
        console.log("Db was closed")
      }
    },
  }
}

export default dbFactory
