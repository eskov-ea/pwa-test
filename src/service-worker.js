import { registerRoute } from 'workbox-routing';

// registerRoute(
//     ({url}) => url.pathname.startsWith(`/users/${id}/posts`),
//     new CacheFirst()
// )

console.log('Hello from service-worker.js');



// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});