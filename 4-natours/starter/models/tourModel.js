const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true
    },
    duration:{
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true,'A tour must have a group size']
    },
    difficulty:{
        type: String,
        required: [true, 'A your must have a difficulty']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 4.5
      },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true,'A tour must have a description']
    },
    description:{
        type: String,
        trim: true,
    },
    imageCover:{
        type: String,
        required: [true, 'A tour just have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
  })
  //the name in the first is the name of the collection. mongodb automatically adds s at the end to make it plural
  const Tour = mongoose.model('Tour', tourSchema)
  
  // const testTour = new Tour({
  //   name: 'The Park Camper',
  //   rating: 4.7,
  //   price: 997
  // })
  
  // testTour.save().then(doc=>{
  //   console.log(doc)
  // }).catch(err=>{
  //   console.log('error',err)
  // })

module.exports = Tour;