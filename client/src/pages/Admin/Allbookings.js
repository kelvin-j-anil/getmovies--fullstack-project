// // AllBookings.js

// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { ShowLoading, HideLoading } from "../../redux/loadersSlice";
// import { message, Row, Col } from "antd";
// import moment from "moment";
// import { GetAllBookings } from "../../apicalls/bookings";  // Import the new API call

// function AllBookings() {
//   const [bookings, setBookings] = useState([]);
//   const dispatch = useDispatch();

//   const getAllBookings = async () => {
//     try {
//       dispatch(ShowLoading());

//       // Use the new API call to fetch all bookings
//       const response = await GetAllBookings();

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

//   useEffect(() => {
//     getAllBookings();
//   }, []);

//   return (
//     <div>
//       {/* Display all bookings similar to the Bookings component */}
      
// <Row gutter={[16, 16]}>
//   {bookings.map((booking) => (
//     <Col span={12} key={booking._id}>
//       {/* Display booking details */}
//       <div>
//         {/* Example: Display movie title */}
//         <h1>{booking.show.movie.title}</h1>
//         {/* Add other details as needed */}
//       </div>
//     </Col>
//   ))}
// </Row>

//     </div>
//   );
// }

// export default AllBookings;


// AllBookings.js

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loadersSlice";
import { message, Table } from "antd";
import moment from "moment";
import { GetAllBookings } from "../../apicalls/bookings";  // Import the new API call

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  const getAllBookings = async () => {
    try {
      dispatch(ShowLoading());

      // Use the new API call to fetch all bookings
      const response = await GetAllBookings();

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

  useEffect(() => {
    getAllBookings();
  }, []);

  const columns = [
    {
      title: 'Movie Name',
      dataIndex: ['show', 'movie', 'title'],
      key: 'movieName',
    },
    {
      title: 'Language',
      dataIndex: ['show', 'movie', 'language'],
      key: 'language',
    },
    {
      title: 'Theatre Name',
      dataIndex: ['show', 'theatre', 'name'],
      key: 'theatreName',
    },
    {
      title: 'Theatre Address',
      dataIndex: ['show', 'theatre', 'address'],
      key: 'theatreAddress',
    },
    {
      title: 'Date & Time of Show',
      dataIndex: 'show.date',
      key: 'dateTime',
      render: (text, record) => (
        <span>
          {moment(record.show.date).format("MMM Do YYYY")} - {moment(record.show.time, "HH:mm").format("hh:mm A")}
        </span>
      ),
    },
    {
      title: 'Show Name',
      dataIndex: ['show', 'name'],
      key: 'showName',
    },
    {
        title: 'Booked Date & Time',
        dataIndex: 'createdAt',
        key: 'bookedDateTime',
        render: (text, record) => (
          <span>
            {moment(record.createdAt).format("MMM Do YYYY, hh:mm A")}
          </span>
        ),
      },
    {
      title: 'Booked By',
      dataIndex: ['user', 'name'],
      key: 'name',
    },
    {
      title: 'Booked Seats',
      dataIndex: 'seats',
      key: 'seats',
      render: (seats) => (
        <span>
          {seats.join(", ")}
        </span>
      ),
    },
    // Add more columns as needed
  ];

  return (
    <div>
      <Table dataSource={bookings} columns={columns} rowKey="_id" />
    </div>
  );
}

export default AllBookings;
