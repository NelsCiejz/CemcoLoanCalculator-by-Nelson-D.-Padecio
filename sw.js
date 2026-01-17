self.addEventListener('fetch', (event) => {
  // Kahit walang laman na cache, kailangan ito para maging "Installable"
  event.respondWith(fetch(event.request));
});
