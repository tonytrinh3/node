const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1) middleware
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV==='development'){
    app.use(morgan('dev')); // morgan console.log info for crud stuff and status code
}


app.use(express.json()); // middleware - change the data between req and res
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  //console.log('hi from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

//2) route handler
// const getAllTours = (req, res) => {
//     console.log(req.requestTime);
//     res.status(200).json({
//       status: 'success',
//       requestedAt: req.requestTime,
//       result: tours.length,
//       data: {
//         tours: tours,
//       },
//     });
//   };

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id',deleteTour);

// app.post('/api/v1/tours', createTour);

//3) routes
// const tourRouter = express.Router();
//const userRouter = express.Router();

// tourRouter.route('/').get(getAllTours).post(createTour);
// tourRouter.route('/').get(getTour).patch(updateTour).delete(deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//4) start server
module.exports = app;