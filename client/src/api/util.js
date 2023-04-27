export function stringfy_date(date) {
  let ret = `${date.getMonth()}월 ${date.getDate()}일 ${date.getHours()}시`;
  ret += date.getMinutes() === 0 ? "" : ` ${date.getMinutes()}분`;

  return ret;
}
