const taskModel = (db) => {
  const createTable = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    data TEXT NOT NULL,
    isWork BOOLEAN NOT NULL,
    createAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    startWorkAt DATETIME,
    doneAt DATETIME
  );
`

  db.exec(createTable)

  return {
    insert: () => {},
    delete: () => {},
    update: () => {},
    getLast: () => {},
  }
}

export default taskModel
