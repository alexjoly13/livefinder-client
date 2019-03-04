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

export function getTopArtist() {
  return backendApi.get("/userInfo").catch(errorHandler);
}

export function getTopFrench() {
  return backendApi.get("/top-french").catch(errorHandler);
}

export function getTopArtistsList() {
  return backendApi.get("/top-artists-list").catch(errorHandler);
}

export function getRelatedConcerts() {
  return backendApi.get("/similar-artist").catch(errorHandler);
}
