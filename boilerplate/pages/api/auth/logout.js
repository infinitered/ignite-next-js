const { setCookie } = require("nookies")

module.exports = async (req, res) => {
  // log out
  setCookie({ req, res }, "user", "", {
    maxAge: -1,
    path: "/"
  })

  // redirect to the home page
  res.writeHead(302, { Location: "/" })
  res.end()
}
