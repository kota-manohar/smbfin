const { pool } = require('./server/db');

async function checkTables() {
    try {
        const [rows] = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = DATABASE()");
        console.log('Tables in DB:');
        rows.forEach(row => console.log(row.TABLE_NAME || row.table_name));
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkTables();
