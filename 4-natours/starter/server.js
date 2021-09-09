const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app')
dotenv.config({ path: './config.env'}) //only need to read once bc it is in the process. it is in every single file
//dotenv needs to be read first before app

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con=>{
  console.log(con.connections);
  console.log("DB connection successful!")
});

//console.log(process.env)

const port = process.env.PORT || 8000; //lesson 67 env dev
app.listen(port, () => {
  console.log(`${port} running`);
});
