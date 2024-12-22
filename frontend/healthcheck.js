const http = require("http")

const hostname = process.env.SERVICE_HOST
const port = process.env.SERVICE_PORT
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
