import axios from "axios";

export async function getMatchings() {
  const path = "/api/matchings/?status=마감 임박,모집중";

  return axios.get(path);
}

export async function getSingleMatching(id) {
  const path = "/api/matchings/" + id;

  return axios.get(path);
}

export async function getMyMatchings() {
  const path =
    "/api/matchings?status=모집 완료,모집중,마감 임박&order-by=starts_at&order-direction=desc";

  return axios.get(path);
}
