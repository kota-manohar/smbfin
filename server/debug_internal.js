const pool = require('./db');

async function testFailingQueries() {
    try {
        console.log('--- Testing GET /api/customers/5349 ---');
        const [rows1] = await pool.query('SELECT * FROM smb_customer_details WHERE customer_id = ?', ['5349']);
        console.log('Customer 5349 found:', rows1.length > 0);
        if (rows1.length > 0) console.log('Customer Name:', rows1[0].customer_name);

        console.log('\n--- Testing Transactions Search ---');
        // Assuming a wide date range for test
        const startDate = '2020-01-01';
        const endDate = '2025-12-31';
        const [rows2] = await pool.query(
            `SELECT * FROM smb_transactions_history 
       WHERE DATE(transaction_date) BETWEEN ? AND ? 
       ORDER BY transaction_date DESC LIMIT 5`,
            [startDate, endDate]
        );
        console.log('Transactions found:', rows2.length);
        if (rows2.length > 0) console.log('First Txn ID:', rows2[0].transaction_id);

        process.exit(0);
    } catch (error) {
        console.error('Query failed:', error);
        process.exit(1);
    }
}

testFailingQueries();
