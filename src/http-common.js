import axios from "axios";
const token = localStorage.getItem("token");

export default axios.create({
  baseURL: "https://rogerdev-beckend-todolist.herokuapp.com",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`
  }

});