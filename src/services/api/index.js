import axios from "axios";

const BASE_URL = "https://picket.store/";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

const getData = (...args) => {
  return instance.get(...args);
};
const postData = (...args) => {
  return instance.post(...args);
};
const putData = (...args) => {
  return instance.put(...args);
};
const delData = (...args) => {
  return instance.delete(...args);
};
const patchData = (...args) => {
  return instance.patch(...args);
};

export { getData, postData, putData, delData, patchData };
