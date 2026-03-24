import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";

const dbUrl = process.env.DATABASE_URL;
console.log("DB URL available:", !!dbUrl);
if (!dbUrl) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const connection = await mysql.createConnection(dbUrl);
const db = drizzle(connection);
try {
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migration applied successfully!");
} catch (e) {
  console.error("Migration error:", e.message);
  process.exit(1);
} finally {
  await connection.end();
}
