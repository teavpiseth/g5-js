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
  console.log("Checking dashboard authentication:", getDashboardAuth());
  return Boolean(getDashboardAuth()?.email);
}

export function setDashboardAuth(payload) {
  localStorage.setItem(
    DASHBOARD_AUTH_KEY,
    JSON.stringify({
      ...payload,
      loginAt: new Date().toISOString(),
    }),
  );
}

export function clearDashboardAuth() {
  localStorage.removeItem(DASHBOARD_AUTH_KEY);
}
