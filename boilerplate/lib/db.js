const mysql = require("serverless-mysql")

exports.query = async query => {
  const config = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }

  const allConfigsPresent = Object.keys(config).every(v => !!v)
  if (!allConfigsPresent) {
    console.error(`Missing config values!`)
    console.error(`Did you run \`source .env\`?`)
    console.debug(config)
    process.exit(1)
  }

  const db = mysql({ config })

  try {
    const results = await db.query(query)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}
