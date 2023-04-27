import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
  return cookies.set(name, value, options);
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  cookies.remove(name);
};

export function stringfy_date(date) {
  let ret = `${date.getMonth()}월 ${date.getDate()}일 ${date.getHours()}시`;
  ret += date.getMinutes() === 0 ? "" : ` ${date.getMinutes()}분`;

  return ret;
}
