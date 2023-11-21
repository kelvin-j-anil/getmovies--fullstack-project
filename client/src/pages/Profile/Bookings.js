
// import React, { useEffect, useState } from "react";
// import Button from "../../components/Button";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
// import { message, Row, Table, Col } from "antd";
// import { GetBookingsOfUser, DeleteBooking } from "../../apicalls/bookings"; // Import the new API call
// import moment from "moment";

// function Bookings() {
//   const [bookings, setBookings] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const getData = async () => {
//     try {
//       dispatch(ShowLoading());
//       const response = await GetBookingsOfUser();
//       if (response.success) {
//         setBookings(response.data);
//       } else {
//         message.error(response.message);
//       }
//       dispatch(HideLoading());
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await DeleteBooking(bookingId);

//       if (response.success) {
//         message.success("Booking deleted successfully");
//         getData(); // Refresh the bookings after deletion
//       } else {
//         message.error(response.message);
//       }

//       dispatch(HideLoading());
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div>
//       <Row gutter={[16, 16]}>
//         {bookings.map((booking) => (
//           <Col span={12} key={booking._id}>
//             <div className="card p-2 flex justify-between uppercase">
//               <div>
//                 <h1 className="text-xl">
//                   {booking.show.movie.title} ({booking.show.movie.language})
//                 </h1>
//                 <div className="divider"></div>
//                 <h1 className="text-sm">
//                   {booking.show.theatre.name} ({booking.show.theatre.address})
//                 </h1>
//                 <h1 className="text-sm">
//                   Date & Time: {moment(booking.show.date).format("MMM Do YYYY")}{" "}
//                   - {moment(booking.show.time, "HH:mm").format("hh:mm A")}
//                 </h1>

//                 <h1 className="text-sm">
//                   Amount : ₹ {booking.show.ticketPrice * booking.seats.length}
//                 </h1>
//                 <h1 className="text-sm">Booking ID: {booking._id}</h1>
//               </div>

//               <div>
//                 <img
//                   src={booking.show.movie.poster}
//                   alt=""
//                   height={100}
//                   width={100}
//                   className="br-1"
//                 />
//                 <h1 className="text-sm">Seat NO/NOS: {booking.seats.join(", ")}</h1>

//                 {/* Delete icon/button */}
//                 <button
//                   onClick={() => handleDeleteBooking(booking._id)}
//                   className="ri-delete-bin-line"
//                 />
//               </div>
//             </div>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }

// export default Bookings;

import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Row, Table, Col } from "antd";
import { GetBookingsOfUser, DeleteBooking } from "../../apicalls/bookings";
import moment from "moment";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBookingsOfUser();
      if (response.success) {
        setBookings(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteBooking(bookingId);

      if (response.success) {
        message.success("Booking deleted successfully");
        getData(); // Refresh the bookings after deletion
      } else {
        message.error(response.message);
      }

      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Function to check if there is time left for the show
  const isTimeLeftForShow = (showDate, showTime) => {
    const showDateTime = moment(`${showDate} ${showTime}`, "YYYY-MM-DD HH:mm");
    const currentDateTime = moment();
    return showDateTime.isAfter(currentDateTime);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {bookings.map((booking) => (
          <Col span={12} key={booking._id}>
            <div className="card p-2 flex justify-between uppercase">
              <div>
                <h1 className="text-xl">
                  {booking.show.movie.title} ({booking.show.movie.language})
                </h1>
                <div className="divider"></div>
                <h1 className="text-sm">
                  {booking.show.theatre.name} ({booking.show.theatre.address})
                </h1>
                <h1 className="text-sm">
                  Date & Time: {moment(booking.show.date).format("MMM Do YYYY")}{" "}
                  - {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                </h1>

                <h1 className="text-sm">
                  Amount : ₹ {booking.show.ticketPrice * booking.seats.length}
                </h1>
                <h1 className="text-sm">Booking ID: {booking._id}</h1>
              </div>

              <div>
                <img
                  src={booking.show.movie.poster}
                  alt=""
                  height={100}
                  width={100}
                  className="br-1"
                />
                <h1 className="text-sm">Seat NO/NOS: {booking.seats.join(", ")}</h1>

                {/* Conditionally render the delete button */}
                {isTimeLeftForShow(booking.show.date, booking.show.time) && (
                  <button
                    onClick={() => handleDeleteBooking(booking._id)}
                    className="ri-delete-bin-line mt-2 "
                  > Cancel Ticket </button> 
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Bookings;

