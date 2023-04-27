import axios from "axios";
import { getCookie } from "./util";

// import { API_SERVER } from "./index";

export async function loginCheck() {
  const path = "/api/users/me";

  return axios.get(path);
}

export async function doLogout() {
  const path = "/api/users/logout/";

  return axios.post(
    path,
    {},
    {
      headers: {
        "x-csrftoken": getCookie("csrftoken"),
      },
    }
  );
}

export async function doLogin({ username, password }) {
  const path = "/api/users/login/";

  return axios.post(path, {
    username,
    password,
  });
}
