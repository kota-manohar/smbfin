const db = require('./server/db');

async function testContext() {
    try {
        console.log("Testing 1: Today's Collections");
        const [todayCollectionsResult] = await db.query(`
            SELECT SUM(paid_due) as total 
            FROM smb_transactions_history 
            WHERE DATE(transaction_date) = CURRENT_DATE()
        `);
        console.log("Today's Collections:", todayCollectionsResult);

        console.log("Testing 2: Overdue Count");
        const [overdueResult] = await db.query(`
            SELECT COUNT(*) as count 
            FROM smb_customer_details 
            WHERE tot_due_amt > 0
        `);
        console.log("Overdue Count:", overdueResult);

        console.log("Testing 3: Active Loans");
        const [activeLoansResult] = await db.query(`
            SELECT COUNT(*) as count 
            FROM smb_customer_details 
            WHERE cust_status IN ('ACTIVE', 'A', 'U')
        `);
        console.log("Active Loans:", activeLoansResult);

        console.log("Testing 4: Weekly Trend");
        const [weeklyTrendResult] = await db.query(`
            SELECT DATE_FORMAT(transaction_date, '%a') as name, SUM(paid_due) as value
            FROM smb_transactions_history
            WHERE transaction_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY)
            GROUP BY DATE(transaction_date)
            ORDER BY DATE(transaction_date)
        `);
        console.log("Weekly Trend:", weeklyTrendResult);

        console.log("Testing 5: Expenses");
        const [expensesResult] = await db.query(`
            SELECT category as name, SUM(amount) as value
            FROM smb_expenses
            GROUP BY category
        `);
        console.log("Expenses:", expensesResult);

        console.log("Testing 6: Top Products");
        const [productsResult] = await db.query(`
            SELECT ITEM_NAME as product_name, COUNT(*) as sales_count, SUM(SALED_PRICE) as total_revenue
            FROM ITEM_DETAILS
            WHERE ITEM_NAME IS NOT NULL
            GROUP BY ITEM_NAME
            ORDER BY sales_count DESC
            LIMIT 5
        `);
        console.log("Top Products:", productsResult);

        console.log("ALL TESTS PASSED");
        process.exit(0);

    } catch (error) {
        console.error("TEST FAILED:", error);
        process.exit(1);
    }
}

testContext();
