const DASHBOARD_AUTH_KEY = "dashboard_auth";

export function getDashboardAuth() {
  try {
    const storedValue = localStorage.getItem(DASHBOARD_AUTH_KEY);

    if (!storedValue) {
      return null;
    }

    return JSON.parse(storedValue);
  } catch {
    return null;
  }
}

export function isDashboardAuthenticated() {
  return Boolean(getDashboardAuth()?.accessToken);
}

export function setDashboardAuth(payload) {
  const user = payload?.user || {};
  localStorage.setItem(
    DASHBOARD_AUTH_KEY,
    JSON.stringify({
      user,
      accessToken: payload?.accessToken || "",
      refreshToken: payload?.refreshToken || "",
      email: user?.email || payload?.email || "",
      username: user?.username || payload?.username || "",
      loginAt: new Date().toISOString(),
    }),
  );
}

export function getDashboardAccessToken() {
  return getDashboardAuth()?.accessToken || "";
}

export function clearDashboardAuth() {
  localStorage.removeItem(DASHBOARD_AUTH_KEY);
}
