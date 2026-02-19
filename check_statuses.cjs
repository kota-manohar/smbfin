const pool = require('./server/db');

async function checkStatuses() {
    try {
        console.log("--- Distinct Customer Statuses ---");
        const [rows] = await pool.query("SELECT DISTINCT cust_status FROM smb_customer_details");
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkStatuses();
