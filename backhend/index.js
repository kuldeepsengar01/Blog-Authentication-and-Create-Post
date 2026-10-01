require('dotenv').config();
const app = require('./src/app');
const ConnectDB = require('./src/database/db');

ConnectDB();

const port = process.env.PORT;

app.listen(port , () =>{
    console.log(`Server Started on Port ${port}`);
})
