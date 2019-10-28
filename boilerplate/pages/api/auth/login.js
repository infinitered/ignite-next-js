const BASE_AUTH_URL = "https://github.com/login/oauth/authorize"

module.exports = async (req, res) => {
  const { GITHUB_CLIENT_ID } = process.env
  const url = `${BASE_AUTH_URL}?client_id=${GITHUB_CLIENT_ID}`
  res.writeHead(302, { Location: url })
  res.end()
}
