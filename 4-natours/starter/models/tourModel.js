const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true
    },
    rating: {
      type: Number,
      default: 4.5
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    }
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