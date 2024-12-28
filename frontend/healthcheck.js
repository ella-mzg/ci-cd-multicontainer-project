const http = require("http")

const hostname = process.env.FRONTEND_HOST || "localhost"
const port = process.env.FRONTEND_PORT || "3000"
const options = { hostname, port, path: "/", method: "GET" }
const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0)
  } else {
    process.exit(1)
  }
})

req.on("error", () => process.exit(1))
req.end()
