const jwt = require("jwt-simple")
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  encode: data => jwt.encode(data, JWT_SECRET),
  decode: data => {
    // in-browser, we won't decode anything, sorry
    if (process.browser) return ""

    if (!JWT_SECRET) {
      console.error(`ENV variables not set (couldn't find JWT_SECRET)`)
      console.log(`Check to make sure you've copied .env.sample to .env`)
      console.log("and run `source .env` from your command line.")
      process.exit(1)
    }

    return jwt.decode(data, JWT_SECRET)
  }
}
