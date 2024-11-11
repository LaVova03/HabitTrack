import axios from "axios";

const api = axios.create({
  baseURL: "https://64980a639543ce0f49e198cf.mockapi.io/",
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getProducts = async () => {
  try {
    const res = await api.get("Products");
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Ошибка ответа:", error.response?.status);
        console.error("Ошибка ответа:", error.response?.data);
      } else if (error.request) {
        console.error("Запрос был сделан, но ответ не получен:", error.request);
      }
    }
  }
};
