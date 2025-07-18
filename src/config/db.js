import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// creates a sql connection with our db url
export const sql = neon(process.env.DATABASE_URL);

export const initDB = async () => {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    console.log("Database initialised successfully");
  } catch (error) {
    console.log("Error initialising DB", error);
    process.exit(1);
  }
};
