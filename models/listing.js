const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { url: String, filename: String },
  price: { type: Number, required: true },
  location: { type: String },
  country: { type: String },
  category: { 
    type: String, 
    enum: ["Hotel", "PG", "Room", "Flat", "Colony"], 
    required: true 
  },

  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },

  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },

  contact: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String },
  },
});

// Delete associated reviews when listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

module.exports = mongoose.model("Listing", listingSchema);
