const Listing = require("../models/listing");
const Review = require("../models/review");

// CREATE REVIEW
module.exports.createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  // Validate review input
  if (!req.body.review || !req.body.review.rating || !req.body.review.comment) {
    req.flash("error", "Rating and comment are required.");
    return res.redirect(`/listings/${req.params.id}`);
  }

  const review = new Review(req.body.review);
  review.author = req.user._id;

  // Save review and push reference to listing
  await review.save();
  listing.reviews.push(review);
  await listing.save();

  req.flash("success", "Review added!");
  res.redirect(`/listings/${req.params.id}`);
};

// DELETE REVIEW
module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }

  // Optional: ensure only author can delete
  if (!req.user._id.equals(review.author)) {
    req.flash("error", "You do not have permission to delete this review");
    return res.redirect(`/listings/${id}`);
  }

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted");
  res.redirect(`/listings/${id}`);
};
