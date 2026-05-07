import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "libs/shared/data-access/prisma/schema.prisma",
  migrations: {
    path: "libs/shared/data-access/prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});