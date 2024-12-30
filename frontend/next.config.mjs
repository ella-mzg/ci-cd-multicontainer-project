import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), "../.env") })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: `http://localhost:${process.env.BACKEND_PORT || "5000"}`
  }
}

export default nextConfig
