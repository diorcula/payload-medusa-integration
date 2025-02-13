import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:3000", // Add your frontend URL here

      adminCors: "http://localhost:3000",
      authCors:
        process.env.AUTH_CORS ||
        "http://localhost:8000,http://localhost:9000,http://localhost:3000",

      jwtSecret:
        process.env.JWT_SECRET || "supersecret" || process.env.MEDUSA_API_KEY,
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
});
