import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:8888",
  withCredentials: true
});

function errorHandler(err) {
  if (err.response && err.response.data) {
    console.log("API ERROR", err.response.data);
  } else {
    console.log("React Code Error", err);
  }
  alert("ERROR ! SOMETHING WENT WRONG !");
  throw err;
}

export function getLogOut() {
  return backendApi.get("/logout").catch(errorHandler);
}
