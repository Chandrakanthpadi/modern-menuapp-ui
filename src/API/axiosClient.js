import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://192.168.1.5:8080/";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export default axiosClient;
