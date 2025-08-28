const app = require('./app');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1'; // force IPv4 for Git Bash curl
app.listen(PORT, HOST, () => console.log(`Server running http://${HOST}:${PORT}`));
