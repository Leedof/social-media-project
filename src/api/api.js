import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0",
  withCredentials: true,
  headers: {
    "API-KEY": "bde7912d-1948-4f1e-9069-4580d382c5fc",
  },
});

export const authAPI = {
  getAuth() {
    return instance.get("/auth/me").then((response) => response.data);
  },
  signIn(email, password, rememberMe) {
    return instance
      .post("/auth/login", { email, password, rememberMe })
      .then((response) => response.data);
  },
  signOut() {
    return instance.delete("/auth/login").then((response) => response.data);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get("/profile/" + userId).then((response) => response.data);
  },
  getStatus(userId) {
    return instance
      .get("/profile/status/" + userId)
      .then((response) => response.data);
  },
  setStatus(status) {
    return instance
      .put("/profile/status", { status })
      .then((response) => response.data);
  },
  setPhoto(photoFile) {
    const formData = new FormData();
    formData.append("photos", photoFile);
    return instance
      .put("/profile/photo", formData)
      .then((response) => response.data);
  },
};
