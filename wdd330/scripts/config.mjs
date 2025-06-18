const path = window.location.pathname;
export const BASE_URL = path.endsWith('/') ? path.slice(0, -1) : path;

console.log("BASE_URL detectado:", BASE_URL);