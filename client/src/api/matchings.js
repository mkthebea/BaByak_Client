import axios from "axios";

import { API_SERVER } from "./index";

export async function getMatchings() {
  const path = "/matchings/?status=마감 임박,모집중";

  return axios.get(API_SERVER + path);
}

export async function getSingleMatching(id) {
  const path = "/matchings/" + id;

  return axios.get(API_SERVER + path);
}
