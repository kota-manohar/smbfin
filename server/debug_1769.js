const pool = require('./db');

async function checkCustomer1769() {
    try {
        console.log('Checking smb_customer_details for 1769...');
        const [rows1] = await pool.query('SELECT * FROM smb_customer_details WHERE customer_id = ?', ['1769']);
        console.log('Details found:', rows1.length);
        if (rows1.length > 0) console.log('Details:', rows1[0]);

        console.log('\nChecking smb_customer_transactions for 1769...');
        const [rows2] = await pool.query('SELECT * FROM smb_customer_transactions WHERE customer_id = ?', ['1769']);
        console.log('Transactions found:', rows2.length);
        if (rows2.length > 0) console.log('Txn Data:', rows2[0]);

        process.exit(0);
    } catch (error) {
        console.error('Query failed:', error);
        process.exit(1);
    }
}

checkCustomer1769();
