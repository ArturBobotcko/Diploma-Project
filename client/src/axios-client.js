import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

// Экземпляр axios
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
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
        localStorage.removeItem('is_authorized');
      }
    } catch (e) {
      console.error(e);
    }

    throw error;
  },
);

export default axiosClient;
