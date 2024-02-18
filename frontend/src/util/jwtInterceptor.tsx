import axios from "axios";

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.response.use(
  //success , return response
  (response) => {
    return response;
  },
  //error case, custon logic
  async (error) => {
    if (error.response.status === 401) {
      console.log("AccessToken has been expired.");
      console.log("Prepare to call RefreshToken API:...");
      axios
        .get("http://localhost:5555/auth/refresh", {
          withCredentials: true,
        })
        .catch((rtError) => {
          //if user access with invalide refresh token
          localStorage.removeItem("userProfile");
          return Promise.reject(rtError);
        });
      console.log("Completed... new AccessToken will be used.");
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);

export default jwtInterceptor;
