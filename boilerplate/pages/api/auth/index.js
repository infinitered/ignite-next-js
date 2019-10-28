const { parseCookies } = require("nookies")
const { decode } = require("./_jwt")

module.exports = async (req, res) => {
  // const cookies = parseCookies({ req, res })
  // const loggedIn = !!cookies.user
  // const user = loggedIn ? decode(cookies.user) : undefined
  res.status(200).json({ ok: true })
}
