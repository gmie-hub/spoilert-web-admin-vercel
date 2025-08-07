import axios, { type AxiosInstance } from "axios";

export const apiCall = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_GATEWAY_URL,
  });

  // Set up axios request interceptors
  instance.interceptors.request.use(
    function (config) {
      let token = "107|4giVmAQ74IuWS5sfowwYiQ4ZaSxTVztNrWJAqA3gc043688b";

      if (typeof (config?.headers as any).authorization === "undefined") {
        const tokenModel = JSON.parse(
          localStorage.getItem("spoilert-admin-auth") || "{}"
        );

        if (tokenModel?.token) {
          token = tokenModel?.token;
        }
      }

      // Set headers individually for Axios v1.x+
      if (config.headers) {
        (config.headers as any).Authorization = `Bearer ${token}`;
        // (config.headers as any).Accept = "multipart/form-data";
        // (config.headers as any)["X-XSS-Protection"] = "1; mode=block";
        // (config.headers as any)["Cross-Origin-Embedder-Policy"] = "require-corp";
        // (config.headers as any)["Content-Security-Policy"] =
        //   "script-src 'self' 'unsafe-inline' kit.fontawesome.com code.jquery.com cdn.jsdelivr.net embed.tawk.to static-v.tawk.to stackpath.bootstrapcdn.com cdn.datatables.net pharmmall.azurewebsites.net https://standard.paystack.co https://merchant-api.staging.cyberpay.ng";
        // (config.headers as any)["X-Frame-Options"] = "SAMEORIGIN";
        // (config.headers as any)["X-Content-Type-Options"] = "nosniff";
        // (config.headers as any)["Strict-Transport-Security"] = "max-age=31536000";
        // (config.headers as any)["Feature-Policy"] =
        //   "accelerometer 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; usb 'none'";
        // (config.headers as any)["Cache-Control"] = "no-cache";
        // (config.headers as any)["Cross-Origin-Opener-Policy"] = "same-origin";
        // (config.headers as any).Pragma = "no-cache";
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Axios Response Interceptor
  instance.interceptors.response.use(
    function (config) {
      return config;
    },
    function (error) {
      if (updateOnlineStatus() === "offline") {
        error = {
          message:
            "You are currently offline. Kindly turn on your network or try again",
        };
        return Promise.reject(error);
      }

      if (error?.response?.status === 401) {
        localStorage.removeItem("result-manager-auth");
        window.location.replace("/");
      }

      return Promise.reject(error);
    }
  );

  function updateOnlineStatus() {
    return navigator.onLine ? "online" : "offline";
  }

  window.addEventListener("offline", updateOnlineStatus);
  window.addEventListener("online", updateOnlineStatus);

  return instance;
};

export default apiCall;
