const db = require("../../../lib/db")
const escape = require("sql-template-strings")

module.exports = async (req, res) => {
  const users = await db.query(escape`
    SELECT *
    FROM users
    ORDER BY id
  `)

  const count = await db.query(escape`
    SELECT COUNT(*)
    AS usersCount
    FROM users
  `)

  const { usersCount } = count[0]

  res.status(200).json({ users, usersCount })
}
