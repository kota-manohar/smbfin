const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkConnection() {
    console.log('Testing database connection...');
    console.log('Host:', process.env.DB_HOST);
    console.log('User:', process.env.DB_USER);
    console.log('Database:', process.env.DB_NAME);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'srv945.hstgr.io',
            user: process.env.DB_USER || 'u307442259_smb',
            password: process.env.DB_PASSWORD || '29oSy?faC&',
            database: process.env.DB_NAME || 'u307442259_smb',
            port: process.env.DB_PORT || 3306
        });
        console.log('✅ Successfully connected to the database!');
        await connection.end();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
}

checkConnection();
