const pool = require('./server/db');

async function checkOverdue() {
    try {
        console.log("--- Checking Overdue Payments ---");

        // Sum total
        const [sumResult] = await pool.query("SELECT SUM(tot_due_amt) as total FROM smb_customer_details");
        console.log("Total Overdue (SUM tot_due_amt):", sumResult[0].total);

        // Top 5 customers contributing to this
        console.log("\n--- Top 5 Highest Overdue ---");
        const [rows] = await pool.query(`
            SELECT customer_id, customer_name, tot_due_amt 
            FROM smb_customer_details 
            ORDER BY tot_due_amt DESC 
            LIMIT 5
        `);
        console.table(rows);

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkOverdue();
