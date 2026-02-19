const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'srv945.hstgr.io',
    user: process.env.DB_USER || 'u307442259_smb',
    password: process.env.DB_PASSWORD || '29oSy?faC&',
    database: process.env.DB_NAME || 'u307442259_smb',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to database');
        connection.release();
    }
});

const promisePool = pool.promise();

module.exports = promisePool;
