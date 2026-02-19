const pool = require('./server/db');

async function listTables() {
    try {
        const [rows] = await pool.query("SHOW TABLES");
        console.log("Tables:", rows);
        process.exit(0);
    } catch (error) {
        console.error("Error listing tables:", error);
        process.exit(1);
    }
}

listTables();
