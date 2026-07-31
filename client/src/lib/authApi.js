const ACCESS_TOKEN_KEY = "bankhub_access_token";
const REFRESH_TOKEN_KEY = "bankhub_refresh_token";
const USER_KEY = "bankhub_user";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

function saveSession(session) {
  localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

function clearSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function getUserFromStorage() {
  const serialized = localStorage.getItem(USER_KEY);
  if (!serialized) {
    return null;
  }

  try {
    return JSON.parse(serialized);
  } catch (_error) {
    return null;
  }
}

async function callAuth(endpoint, method, payload) {
  const response = await fetch(`${API_BASE_URL}/api/auth/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: payload ? JSON.stringify(payload) : undefined
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Authentication request failed");
  }

  return data;
}

async function register(payload) {
  const session = await callAuth("register", "POST", payload);
  saveSession(session);
  return session;
}

async function login(payload) {
  const session = await callAuth("login", "POST", payload);
  saveSession(session);
  return session;
}

async function logout() {
  const refreshToken = getRefreshToken();

  if (refreshToken) {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refreshToken })
    }).catch(() => undefined);
  }

  clearSession();
}

async function refreshSession() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const session = await callAuth("refresh", "POST", { refreshToken });
  saveSession(session);
  return session;
}

async function fetchWithAuth(input, init = {}) {
  const headers = new Headers(init.headers || {});
  const token = getAccessToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response = await fetch(`${API_BASE_URL}${input}`, {
    ...init,
    headers
  });

  if (response.status === 401 && getRefreshToken()) {
    await refreshSession();
    const retryHeaders = new Headers(init.headers || {});
    retryHeaders.set("Authorization", `Bearer ${getAccessToken()}`);

    response = await fetch(`${API_BASE_URL}${input}`, {
      ...init,
      headers: retryHeaders
    });
  }

  return response;
}

export {
  clearSession,
  fetchWithAuth,
  getUserFromStorage,
  login,
  logout,
  register
};
