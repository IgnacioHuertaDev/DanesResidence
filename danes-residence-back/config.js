const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 8000,
  MONGO_DB_URI: process.env.MONGO_DB_URI || 'mongodb+srv://dbAdmin:StrongPassword123@cluster0.qp7sh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}


// Santi
// 'mongodb+srv://sdragotto:Mongodb01@cluster0.oy73q.mongodb.net/danesresidence?retryWrites=true&w=majority'

// Efra 
// 'mongodb+srv://dbAdmin:StrongPassword123@cluster0.qp7sh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'