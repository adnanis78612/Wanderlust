const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js")

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: { 
    type: Number,
  },
  location: String,
  country: String,
  reviews: [
    {
      type:Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
    coordinates: {
        type: [Number],
        required: true,
    },
 },
});

// 🟢 PRE-SAVE HOOK to set default image if URL is missing or empty
listingSchema.pre("save", function (next) {
  if (!this.image || !this.image.url || this.image.url.trim() === "") {
    this.image = {
      filename: "default",
      url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    };
  }
  next();
});


listingSchema.post("findOneAndDelete", async(listing)=>{
  if (listing) {
    await Review.deleteMany({_id:{$in: listing.reviews}});
  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
