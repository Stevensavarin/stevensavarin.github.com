export function setupBaseUrl() {
  const path = window.location.pathname;
  let baseUrl;

  if (path === '/') {
    baseUrl = '/'; 
  } else if (path.endsWith('/')) {
    baseUrl = path;
  } else {
    baseUrl = path + '/';
  }
  
  const baseTag = document.createElement('base');
  baseTag.href = baseUrl;
  document.head.prepend(baseTag);
  
  console.log("early-load.mjs: <base> tag establecido en:", baseUrl);
}