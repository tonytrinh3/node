const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel')

dotenv.config({ path: `${__dirname}/../../config.env` });//only need to read once bc it is in the process. it is in every single file
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

//READ JSON FILE
//in case of node, node runs based on home folder but since we are running this in not a home folder, we will need to use dirname to have the directly run from here
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'))

//IMPORT DATA INTO DB
const importData = async () =>{
    try{
        await Tour.create(tours);
        console.log('Data successfully loaded!')
    }catch(err){
        console.log(err)
    }
    process.exit();
}

//DELETE ALL DATA  FROM DB
const deleteData = async () =>{
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted!')
    } catch (err){
        console.log(err)
    }
    process.exit();
}

if (process.argv[2]=== '--import'){
    importData();
} else if (process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv)