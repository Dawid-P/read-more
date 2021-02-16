import mongoose from 'mongoose';

/* PagesSchema will correspond to a collection in your MongoDB database. */
const PagesSchema = new mongoose.Schema({
  day: {
    /* The date of this entry */

    type: String,
    required: [true, 'Please provide a valid date.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  pages: {
    /* The number of pages */

    type: Number,
    required: [true, 'Please provide a valid number'],
  },
});

export default mongoose.models.Pages || mongoose.model('Pages', PagesSchema);
