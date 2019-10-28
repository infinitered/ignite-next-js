const { setCookie } = require("nookies")
const { create } = require("apisauce")
const { encode } = require("../../../lib/jwt")

const BASE_TOKEN_URL = "https://github.com/login/oauth/access_token"
const BASE_USER_URL = "https://api.github.com/user"

// Reference: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow
module.exports = async (req, res) => {
  const { GITHUB_CLIENT_ID, GITHUB_SECRET } = process.env
  const { code } = req.query
  const api = create({ headers: { Accept: "application/json" } })

  // Go get an access_token with the code we received
  const query = {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_SECRET,
    code
  }
  const result = await api.post(BASE_TOKEN_URL, query)
  if (!result.data.access_token) return noTokenFound(res)

  // Now go get the user's profile
  const config = { headers: { Authorization: `token ${result.data.access_token}` } }
  const userResult = await api.get(BASE_USER_URL, {}, config)

  // if we got the user ...
  const user = userResult.data

  // ... let's store it in a cookie
  const payload = encode(JSON.stringify(user))
  setCookie({ req, res }, "user", payload, {
    maxAge: 90 * 24 * 60 * 60, // 3 months
    path: "/"
  })

  res.writeHead(302, { Location: "/" })
  res.end()
}

// All the error states:
function noTokenFound(res) {
  res.status(500).json({ error: "noTokenFound" })
}
