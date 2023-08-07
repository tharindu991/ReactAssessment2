import axios from "axios";

const http = axios.create({
  baseURL: "https://ec63c24e-efde-483f-976e-1354978704c9.mock.pstmn.io",
});

console.log(http.defaults.baseURL);

export default http;
