import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} belum diatur`);
  }

  return value;
}

export const adapter = new PrismaMariaDb({
  host: requireEnv("DATABASE_HOST"),
  user: requireEnv("DATABASE_USER"),
  password: requireEnv("DATABASE_PASSWORD"),
  database: requireEnv("DATABASE_NAME"),
  connectionLimit: 5,
});
