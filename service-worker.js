importScripts("/pwa-test/precache-manifest.76b422860ba2901efdbc9acab707ce17.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

console.log('You are using service-worker');

workbox.core.setCacheNameDetails({
    prefix: 'My-cache',
    precache: 'precache',
    runtime: 'runtime',
});
/**
 * caches images
 */
workbox.routing.registerRoute(
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
/**
 * caches articles
 */
workbox.routing.registerRoute(
    new RegExp('https:\/\/jsonplaceholder\.typicode\.com\/users\/[1-9]*\/posts'),
    workbox.strategies.cacheFirst({
        cacheName: 'My-cache-Posts',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 7,
                maxEntries: 50,
                purgeOnQuotaError: true
            })
        ]
    })
);
