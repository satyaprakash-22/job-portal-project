// backend/db.js
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { join } from "path";
import { fileURLToPath } from "url";

// Needed because ES modules don’t have __dirname by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

// Path to your db.json
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter, { users: [], jobs: [] });

await db.read();

// Initialize empty structure if file is missing
db.data ||= { users: [], jobs: [] };

export default db;
