// backend/routes/api/bookings.js
const express = require("express");

const { Booking, Spot, SpotImage, User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

//* GET all bookings by the Current User
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;
  console.log(">>>>>>>>>USER ID: ", userId);

  const bookings = await Booking.findAll({
    where: {
      userId: userId,
    },

    include: [
      {
        model: Spot,
        as: "Spot",
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
        include: [
          {
            model: SpotImage,
            as: "SpotImages",
            where: { preview: true }, // Only return preview images
            attributes: ["url"],
            required: false,
          },
        ],
      },
    ],
  });

  //Format the output to include preview image in the Spot object
  const formattedBookings = bookings.map((booking) => {
    const spotImages = booking.Spot.SpotImages;
    const previewImage = spotImages.length > 0 ? spotImages[0].url : null;

    return {
      id: booking.id,
      spotId: booking.spotId,
      Spot: {
        id: booking.Spot.id,
        ownerId: booking.Spot.ownerId,
        address: booking.Spot.address,
        city: booking.Spot.city,
        state: booking.Spot.state,
        country: booking.Spot.country,
        lat: booking.Spot.lat,
        lng: booking.Spot.lng,
        name: booking.Spot.name,
        price: booking.Spot.price,
        previewImage,
      },
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
  });

  return res.json({ Bookings: formattedBookings });
});

module.exports = router;
