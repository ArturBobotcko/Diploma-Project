import axios from 'axios';

// Экземпляр axios
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
});

// Перехват запросов
axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Перехват ответов
axiosClient.interceptors.response.use(
  // Функция, обрабатывающая ответ с кодом состояния в диапазоне 2xx
  response => {
    return response;
  },
  // Функция, обрабатывающая ответ с кодом состояния, выходящий за предел 2xx
  error => {
    try {
      const { response } = error;
      if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
      }
    } catch (e) {
      console.error(e);
    }

    throw error;
  },
);

export default axiosClient;
