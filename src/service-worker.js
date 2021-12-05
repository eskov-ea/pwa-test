self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

import { registerRoute } from 'workbox-routing';

// registerRoute(
//     ({url}) => url.pathname.startsWith(`/users/${id}/posts`),
//     new CacheFirst()
// )

console.log('Hello from service-worker.js');
// workbox.routing.registerRoute()
registerRoute(
    new RegExp('\.(png|svg|jpg|jpeg)$'),
    workbox.strategies.cacheFirst({
        cacheName: 'My-cache-Images',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 7,
                maxEntries: 50,
                purgeOnQuotaError: true
            })
        ]
    })
);



