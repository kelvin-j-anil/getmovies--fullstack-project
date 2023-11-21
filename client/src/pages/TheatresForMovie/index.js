import React, { useEffect } from "react";
import { Col, message, Row, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllMovies, GetMovieById } from "../../apicalls/movies";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { GetAllTheatresByMovie} from "../../apicalls/theatres";


function TheatresForMovie() {
    // initially it should be null
const [movie, setMovie] = React.useState([]);
const [theatres, setTheatres] = React.useState([]);
// get data from query string
const tempDate = new URLSearchParams(window.location.search).get("date");
const [date, setDate] = React.useState(tempDate || moment().format("YYYY-MM-DD"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getTheatres = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatresByMovie({ date, movie: params.id });
      if (response.success) {
        
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() =>{
    getData();
  },[]);

  useEffect(()=>{
    getTheatres();
  },[date])


  return (
     movie && (
      <div>
        {/* movie information */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl uppercase">
              {movie.title} ({movie.language})
            </h1>
            <h1 className="text-md">Duration : {movie.duration} mins</h1>
            <h1 className="text-md">
              Release Date : {moment(movie.releaseDate).format("MMM Do yyyy")}
            </h1>
            <h1 className="text-md">Genre : {movie.genre}</h1>
          </div>

          <div>
            <h1 className="text-md">Select Date</h1>
            <input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                // updating the querry string
                navigate(`/movie/${params.id}?date=${e.target.value}`);
              }}
            />
          </div>
        </div>

        <hr />

        {/* movie theatres */}
        <div className="mt-1">
          <h1 className="text-xl uppercase">Theatres</h1>
        </div>

        <div className="mt-1 flex flex-col gap-1">
          {theatres
        .filter((theatre) =>
        theatre.shows.some(
          (show) =>
            moment(`${show.date} ${show.time}`, "YYYY-MM-DD HH:mm").isSameOrAfter(moment())
        )
      )
          .map((theatre) => (
            <div className="card p-2">
              <h1 className="text-md uppercase mb-1">{theatre.name}</h1>
              <h1 className="text-sm mb-1">Address : {theatre.address}</h1>

              

              <div className="flex gap-2">
                {theatre.shows
                .filter(
                  (show) =>
                    moment(`${show.date} ${show.time}`, "YYYY-MM-DD HH:mm").isSameOrAfter(moment())
                )
                  .sort(
                    (a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                  )
                  .map((show) => (
                    <div
                      className="card p-1 cursor-pointer"
                      onClick={() => {
                        navigate(`/book-show/${show._id}`);
                      }}
                    >
                      <h1 className="text-sm">
                        {moment(show.time, "HH:mm").format("hh:mm A")}
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>


    </div>
     )
  )
}

export default TheatresForMovie;