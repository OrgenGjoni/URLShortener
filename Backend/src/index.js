const app = require('./app');
require('dotenv').config();
const db = require('./db');

const port = process.env.PORT;


db.on('error',console.error.bind(console,'Mongoose error'));

app.listen(port,()=>{
  console.log(`Server listening at port ${port}`);
});
