import { router } from './router.mjs';

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
