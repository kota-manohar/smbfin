const pool = require('./server/db');

async function checkCustomers() {
    try {
        console.log("--- Customer Count ---");
        const [countResult] = await pool.query("SELECT COUNT(*) as total FROM smb_customer_details");
        console.log("Total Customers:", countResult[0].total);

        console.log("\n--- Customer Schema ---");
        const fs = require('fs');
        const [schemaResult] = await pool.query("DESCRIBE smb_customer_details");
        const columns = schemaResult.map(col => col.Field).join('\n');
        fs.writeFileSync('customer_schema.txt', columns);
        console.log("Schema written to customer_schema.txt");

        console.log("\n--- Sample Data ---");
        const [sampleResult] = await pool.query("SELECT * FROM smb_customer_details LIMIT 3");
        console.log(sampleResult);

        process.exit(0);
    } catch (error) {
        console.error("Error checking customers:", error);
        process.exit(1);
    }
}

checkCustomers();
