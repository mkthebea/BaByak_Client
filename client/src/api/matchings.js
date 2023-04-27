import axios from "axios";
import { getCookie } from "./util";

export async function getMatchings() {
  const path = "/api/matchings/?status=마감 임박,모집중,모집 완료";

  return axios.get(path);
}

export async function getSingleMatching(id) {
  const path = "/api/matchings/" + id;

  return axios.get(path);
}

export async function getMyMatchings() {
  const path = "/api/matchings";

  return axios.get(path);
}
