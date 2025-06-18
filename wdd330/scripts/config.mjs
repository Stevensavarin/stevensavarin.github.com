export const REPO_BASE_URL = window.location.host.includes('github.io') 
    ? `${window.location.origin}/wdd330/`
    : '';

console.log("config.mjs: REPO_BASE_URL definida como:", REPO_BASE_URL);