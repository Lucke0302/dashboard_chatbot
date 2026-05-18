import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://bostossauro.runage.tech/api', 
  withCredentials: true, 
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          'https://bostossauro.runage.tech/api/auth/refresh',
          {},
          { withCredentials: true }
        );

        api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('bostopark_user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);