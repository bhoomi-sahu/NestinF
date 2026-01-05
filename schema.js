const joi = require("joi");

module.exports.listingSchema = joi.object({
  listing: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    location: joi.string().required(),
    country: joi.string().required(),
    price: joi.number().min(0).required(), // ✅ changed to number
    image: joi.string().allow("", null),
    category: joi
      .string()
      .valid("Hotel", "PG", "Room", "Flat", "Colony")
      .required(),
    contact: joi.object({
      name: joi.string().required(),
      phone: joi.string().pattern(/^[0-9]{10}$/).required(),
      email: joi.string().email().required(),
      whatsapp: joi.string().pattern(/^[0-9]{10}$/).allow("", null),
    }).required(),
  }).required(),
});

module.exports.reviewSchema = joi.object({
  review: joi.object({
    rating: joi.number().required().min(1).max(5),
    comment: joi.string().required(),
  }).required(),
});
