const { axiosInstance } = require(".");

// Add a new movie
export const AddMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/add-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// get all movies
export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/api/movies/get-all-movies");
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// update a movie
export const UpdateMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/update-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// delete a movie
export const DeleteMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/delete-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// get a movie by id
export const GetMovieById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/movies/get-movie-by-id/${id}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// add show
export const AddShow = async (payload) => {
    try {
      const response = await axiosInstance.post(
        "/api/theatres/add-show",
        payload
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };
  
  // get all shows
  export const GetAllShowsByTheatre = async (payload) => {
    try {
      const response = await axiosInstance.post(
        "/api/theatres/get-all-shows-by-theatre",
        payload
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };
  
  // delete show
  export const DeleteShow = async (payload) => {
    try {
      const response = await axiosInstance.post(
        "/api/theatres/delete-show",
        payload
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };
  
  // get all theatres for a movie
  export const GetAllTheatresByMovie = async (payload) => {
    try {
      const response = await axiosInstance.post(
        "/api/theatres/get-all-theatres-by-movie",
        payload
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };
  