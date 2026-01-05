const Listing = require("../models/listing");
const axios = require("axios");

// SHOW ALL LISTINGS
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

// RENDER NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

// SHOW SINGLE LISTING
module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author", select: "username" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/show", { listing });
};

// RENDER EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  res.render("listings/edit", { listing });
};

// CREATE LISTING
module.exports.createListing = async (req, res) => {
  try {
    const { title, description, price, location, country, category, contact } = req.body.listing;

    // 🌍 Geocode location using Nominatim
    const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${location},${country}`;
    const response = await axios.get(geoUrl, { headers: { "User-Agent": "NestinApp" } });

    const coords = response.data[0] || {};
    const lat = coords.lat || null;
    const lon = coords.lon || null;

    const listing = new Listing({
      title,
      description,
      price,
      location,
      country,
      category,
      latitude: lat,
      longitude: lon,
      owner: req.user._id,
      contact,
    });

    if (req.file) {
      listing.image = { url: req.file.path, filename: req.file.filename };
    }

    await listing.save();
    req.flash("success", "Listing created!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error("🔥 Error in createListing:", err);
    req.flash("error", "Something went wrong while creating the listing.");
    res.redirect("/listings/new");
  }
};

// UPDATE LISTING
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.listing;

  if (req.file) {
    updatedData.image = { url: req.file.path, filename: req.file.filename };
  }

  updatedData.contact = req.body.listing.contact;

  // Update coordinates if location changed
  if (updatedData.location || updatedData.country) {
    const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${updatedData.location},${updatedData.country}`;
    const response = await axios.get(geoUrl, { headers: { "User-Agent": "NestinApp" } });
    const coords = response.data[0] || {};
    updatedData.latitude = coords.lat || null;
    updatedData.longitude = coords.lon || null;
  }

  const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${updatedListing._id}`);
};

// DELETE LISTING
module.exports.destroyListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
