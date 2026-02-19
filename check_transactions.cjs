const pool = require('./server/db');

async function checkTransactions() {
    try {
        const fs = require('fs');
        console.log("--- Transaction Schema ---");
        const [schemaResult] = await pool.query("DESCRIBE smb_transactions_history");
        const columns = schemaResult.map(col => col.Field).join('\n');
        fs.writeFileSync('transaction_schema.txt', columns);
        console.log("Schema written to transaction_schema.txt");

        console.log("\n--- Sample Data ---");
        const [sampleResult] = await pool.query("SELECT * FROM smb_transactions_history LIMIT 3");
        console.log(sampleResult);

        process.exit(0);
    } catch (error) {
        console.error("Error checking transactions:", error);
        process.exit(1);
    }
}

checkTransactions();
