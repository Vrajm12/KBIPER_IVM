import dotenv from "dotenv";
import pg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  const sqlPath = path.resolve(__dirname, "../../lib/db/drizzle/0000_condemned_the_initiative.sql");
  console.log(`Reading migration SQL from: ${sqlPath}`);
  
  if (!fs.existsSync(sqlPath)) {
    console.error("Migration SQL file not found!");
    process.exit(1);
  }

  let sql = fs.readFileSync(sqlPath, "utf8");
  
  // Make CREATE TABLE queries idempotent by adding IF NOT EXISTS
  sql = sql.replace(/CREATE TABLE "/g, 'CREATE TABLE IF NOT EXISTS "');

  // Split into individual statements based on the Drizzle separator
  const statements = sql
    .split("--> statement-breakpoint")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const client = await pool.connect();
  try {
    console.log(`Starting migration of ${statements.length} statements...`);
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      await client.query(stmt);
    }
    console.log("✓ Migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
