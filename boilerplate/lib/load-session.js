import { parseCookies } from "nookies"
import { decode } from "../lib/jwt"

async function loadSession(ctx) {
  // const { req, query } = ctx
  const cookies = parseCookies(ctx)
  const user = cookies.user ? JSON.parse(decode(cookies.user)) : undefined
  const loggedIn = user && user.login.length > 0
  return { cookies, user, loggedIn }
}

module.exports = { loadSession }
