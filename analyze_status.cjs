const pool = require('./server/db');

async function analyzeStatuses() {
    try {
        console.log("--- Status Analysis ---");
        const [rows] = await pool.query(`
            SELECT cust_status, COUNT(*) as count, SUM(tot_due_amt) as total_due 
            FROM smb_customer_details 
            GROUP BY cust_status
        `);
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

analyzeStatuses();
