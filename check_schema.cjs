const pool = require('./server/db');

async function checkSchema() {
    try {
        console.log("--- smb_product ---");
        const [productRows] = await pool.query("DESCRIBE smb_product");
        console.log(productRows);

        console.log("\n--- ITEM_DETAILS ---");
        const [itemRows] = await pool.query("DESCRIBE ITEM_DETAILS");
        console.log(itemRows);

        process.exit(0);
    } catch (error) {
        console.error("Error describing tables:", error);
        process.exit(1);
    }
}

checkSchema();
