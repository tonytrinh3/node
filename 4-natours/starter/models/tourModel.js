const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator')

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour must have less or equal than 40 characters'],
      minlength: [10, 'A tour must have more or equal than 10 characters'],
      //validate: [validator.isAlpha, 'Tour name must only contain character']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A your must have a difficulty'],
      enum: {
          values: ['easy','medium','difficult'],
          message: 'Difficulty is either: easy, medium, difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(val){
                //this only points to current doc on NEW document creation
                return val < this.price; // 250< 200
            },
            message: 'Discount price ({VALUE}) should be below regular price'
        }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour just have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virutals: true },
  }
);
//you need normal function bc you want this to point back to current document
//virtual document les 103
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//DOCUMENT MIDDLEWARE: run before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save',function(next){
//     console.log('will save doc ...')
//     next()
// })

// tourSchema.post('save', function(doc,next){
//     console.log(doc);
//     next();
// })

//QUERY MIDDLEWARE
// /^find/ this is for all that starts with find
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  // console.log(`Query took ${Date.now() - this.start} milliseconds`)
  // console.log(docs);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

//the name in the first is the name of the collection. mongodb automatically adds s at the end to make it plural
const Tour = mongoose.model('Tour', tourSchema);

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
