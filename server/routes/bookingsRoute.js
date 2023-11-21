const router = require("express").Router();
const stripe = require("stripe")(process.env.stripe_key);
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");

// book shows
router.post("/book-show", authMiddleware, async (req, res) => {
  try {
    // save booking
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const show = await Show.findById(req.body.show);
    // update seats
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: [...show.bookedSeats, ...req.body.seats],
    });

    res.send({
      success: true,
      message: "Show booked successfully",
      data: newBooking,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all bookings by user
router.get("/get-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate("user")
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    res.send({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-all-bookings", async (req, res) => {
  try {
    // Fetch all bookings and populate the necessary fields
    const allBookings = await Booking.find()
      .populate("show")
      .populate({
        path: "show",
        populate: [
          { path: "movie", model: "movies" },
          { path: "theatre", model: "theatres" },
        ],
      })
      .populate("user");

    res.send({
      success: true,
      message: "All bookings fetched successfully",
      data: allBookings,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete a booking by ID
router.delete("/delete-booking/:bookingId", async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    // Find the booking by ID
    const deletedBooking = await Booking.findOneAndDelete({ _id: bookingId });

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Update the bookedSeats in the related show
    const showId = deletedBooking.show;
    const seatsToRelease = deletedBooking.seats;

    const updatedShow = await Show.findByIdAndUpdate(
      showId,
      {
        $pull: { bookedSeats: { $in: seatsToRelease } },
      },
      { new: true }
    );

    if (!updatedShow) {
      return res.status(500).json({
        success: false,
        message: "Failed to update show",
      });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully",
      data: deletedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;