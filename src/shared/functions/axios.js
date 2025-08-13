import axios from "axios";

let onUnauthorized;
export const setOnUnauthorized = (fn) => {
  onUnauthorized = fn;
};

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user?.accessToken)
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  return config;
});

function handleUnauthorized() {
  try {
    if (typeof onUnauthorized === "function") onUnauthorized();
  } catch {}
  // Fallback لضمان الخروج حتى لو الـ context مش متاح
  localStorage.removeItem("user");
  console.log("Unauthorized access - redirecting to sign-in");

  // استخدم reload بسيط لتصفير الحالة
  window.location.href = "/#/sign-in";
}

// Response success path: أحياناً السيرفر يرجّع 200 بس success=false
API.interceptors.response.use(
  (res) => {
    const msg = res?.data?.message;
    const success = res?.data?.success;
    if (success === false && /token expired/i.test(String(msg))) {
      handleUnauthorized();
      // نرمي cancel علشان نوقف بقية السلسلة
      throw new axios.Cancel("Token expired");
    }
    return res;
  },
  (err) => {
    const msg = err?.response?.data?.message;
    const isExpiredMsg = /token expired/i.test(String(msg));
    if (err?.response?.status === 401 || isExpiredMsg) {
      handleUnauthorized();
    }
    return Promise.reject(err);
  }
);

export default API;
