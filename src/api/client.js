export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

class ApiClient {
  constructor() {
    this.baseUrl =
      import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
    this.tokenKey = "mpcr_auth_token";
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  async request(method, path, body, params) {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) url.search = new URLSearchParams(params).toString();

    const headers = { "Content-Type": "application/json" };
    const token = this.getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(url.toString(), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      if (res.status === 401) {
        this.clearToken();
        window.location.href = "";
      }
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new ApiError(res.status, err.message || "Request failed");
    }

    return res.json();
  }

  get(path, params) {
    return this.request("GET", path, undefined, params);
  }

  post(path, body) {
    return this.request("POST", path, body);
  }

  patch(path, body) {
    return this.request("PATCH", path, body);
  }

  delete(path) {
    return this.request("DELETE", path);
  }
}

export const apiClient = new ApiClient();
