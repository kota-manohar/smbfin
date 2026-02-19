const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const dbConfig = {
    host: process.env.DB_HOST || 'srv945.hstgr.io',
    user: process.env.DB_USER || 'u307442259_smb',
    password: process.env.DB_PASSWORD || '29oSy?faC&',
    database: process.env.DB_NAME || 'u307442259_smb',
    port: process.env.DB_PORT || 3306
};

function checkColumns() {
    console.log('Connecting...');
    const connection = mysql.createConnection(dbConfig);
    connection.connect();

    const tables = ['smb_customer_details', 'smb_transactions_history'];

    tables.forEach(table => {
        connection.query(`SHOW COLUMNS FROM ${table}`, (err, rows) => {
            if (err) {
                console.error(`Error describing ${table}:`, err);
            } else {
                console.log(`\nColumns in ${table}:`);
                rows.forEach(row => console.log(row.Field));
            }
        });
    });

    setTimeout(() => {
        connection.end();
        process.exit(0);
    }, 2000);
}

checkColumns();
