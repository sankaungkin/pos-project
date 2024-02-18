import axios from "axios";

import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const useAxiosPrivate = () => {
  const { user } = useContext(AuthContext);

  console.log(user);
  const axiosPrivate = axios.create({
    baseURL: "http://localhost:5555",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          const accessToken = "abcd"; // <------ todo
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = "abcd"; // <------ todo
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [axiosPrivate]);

  return axiosPrivate;
};

export default useAxiosPrivate;
