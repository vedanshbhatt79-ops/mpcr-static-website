import { API_URL } from "../constants/env-constants.js";

const AUTH_CHANGE_EVENT = "mpcr:auth-change";

function emitAuthChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function onAuthChange(listener) {
  window.addEventListener(AUTH_CHANGE_EVENT, listener);
  return () => window.removeEventListener(AUTH_CHANGE_EVENT, listener);
}

export async function login(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: username, password }),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || "Login failed. Please try again.");
  }

  return data;
}

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
  emitAuthChange();
}

export function clearToken() {
  localStorage.removeItem("token");
  emitAuthChange();
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function setCurrentUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
  emitAuthChange();
}

export function clearCurrentUser() {
  localStorage.removeItem("user");
  emitAuthChange();
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function logout() {
  clearToken();
  clearCurrentUser();
}
