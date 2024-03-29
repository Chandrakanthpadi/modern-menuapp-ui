import axios from "axios";

const axiosClient = axios.create();

// axiosClient.defaults.baseURL = "http://192.168.1.12:8080/";
// axiosClient.defaults.baseURL = "http://52.24.81.219:8080/";

axiosClient.defaults.baseURL = "http://localhost:9090/";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export default axiosClient;
