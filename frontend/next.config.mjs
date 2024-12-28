import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), "../.env") })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL:
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
    SERVICE_HOST: process.env.FRONTEND_HOST || "localhost",
    SERVICE_PORT: process.env.FRONTEND_PORT || "5000"
  }
}

export default nextConfig
