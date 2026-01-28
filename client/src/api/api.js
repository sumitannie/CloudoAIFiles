import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attaching token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handling auth errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// Auth APIs
export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
};

// File APIs
export const filesAPI = {
  getFiles: (params) => api.get("/files", { params }),
  getTrash: () => api.get("/files/trash"),
  uploadFiles: (formData, onUploadProgress) =>
    api.post("/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    }),
  deleteFile: (id) => api.delete(`/files/${id}`),
  restoreFile: (id) => api.patch(`/files/restore/${id}`),
  deleteForever: (id) => api.delete(`/files/permanent/${id}`),
};

export default api;
