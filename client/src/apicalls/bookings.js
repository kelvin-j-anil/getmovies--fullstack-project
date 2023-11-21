import { axiosInstance } from ".";

// book shows
export const BookShowTickets = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookings/book-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get bookings of a user
export const GetBookingsOfUser = async () => {
  try {
    const response = await axiosInstance.get("/api/bookings/get-bookings");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//get all bookings

export const GetAllBookings = async () => {
  try {
    const response = await axiosInstance.get("/api/bookings/get-all-bookings");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete booking
export const DeleteBooking = async (bookingId) => {
  try {
    const response = await axiosInstance.delete(`/api/bookings/delete-booking/${bookingId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};