const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment preparation...');

// 1. Build the React Frontend
console.log('📦 Building frontend...');
try {
    execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
    console.error('❌ Frontend build failed.');
    process.exit(1);
}

// 2. Prepare Server Public Directory
const serverPublicDir = path.join(__dirname, 'server', 'public');
const distDir = path.join(__dirname, 'dist');

if (fs.existsSync(serverPublicDir)) {
    console.log('🧹 Cleaning old public directory...');
    fs.rmSync(serverPublicDir, { recursive: true, force: true });
}
fs.mkdirSync(serverPublicDir);

// 3. Copy Build Files
console.log('📂 Copying build files to server/public...');
try {
    // Copy all files from dist to server/public
    fs.cpSync(distDir, serverPublicDir, { recursive: true });
    console.log('✅ Files copied successfully.');
} catch (error) {
    console.error('❌ Failed to copy files:', error);
    process.exit(1);
}

console.log('✨ Deployment preparation complete!');
console.log('👉 Go to the "server" directory, zip it, and upload to Hostinger.');
