const pool = require('./server/db');

const seedQueries = [
    `INSERT INTO smb_expenses (date, amount, category, description, payment_method) VALUES (CURRENT_DATE(), 15000, 'Salaries', 'Staff Salaries', 'Bank Transfer')`,
    `INSERT INTO smb_expenses (date, amount, category, description, payment_method) VALUES (DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY), 2500, 'Electricity', 'Monthly Bill', 'UPI')`,
    `INSERT INTO smb_expenses (date, amount, category, description, payment_method) VALUES (DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY), 1200, 'Internet', 'Broadband Bill', 'Card')`,
    `INSERT INTO smb_expenses (date, amount, category, description, payment_method) VALUES (DATE_SUB(CURRENT_DATE(), INTERVAL 3 DAY), 8000, 'Inventory', 'Raw Materials', 'Cash')`,
    `INSERT INTO smb_expenses (date, amount, category, description, payment_method) VALUES (DATE_SUB(CURRENT_DATE(), INTERVAL 4 DAY), 500, 'Refreshments', 'Tea/Snacks', 'Cash')`,
    `INSERT INTO smb_expenses (date, amount, category, description, payment_method) VALUES (DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY), 3000, 'Marketing', 'Local Ads', 'UPI')`
];

async function seedExpenses() {
    try {
        console.log("Seeding expenses...");
        for (const query of seedQueries) {
            await pool.query(query);
        }
        console.log("Expenses seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding expenses:", error);
        process.exit(1);
    }
}

seedExpenses();
