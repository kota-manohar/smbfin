const pool = require('./db');

const createTableQuery = `
CREATE TABLE IF NOT EXISTS \`smb_expenses\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`date\` DATE NOT NULL,
  \`amount\` DECIMAL(10,2) NOT NULL,
  \`category\` VARCHAR(50) NOT NULL,
  \`description\` TEXT,
  \`payment_method\` VARCHAR(50),
  \`created_by\` INT,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

async function createTable() {
    try {
        await pool.query(createTableQuery);
        console.log('smb_expenses table created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating table:', error);
        process.exit(1);
    }
}

createTable();
