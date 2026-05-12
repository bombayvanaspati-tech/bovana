(function(){
  var V = "20260512025353";
  try {
    var stored = localStorage.getItem("site_version");
    if (stored && stored !== V) {
      if (window.caches && caches.keys) {
        caches.keys().then(function(keys){
          return Promise.all(keys.map(function(k){ return caches.delete(k); }));
        }).then(function(){
          localStorage.setItem("site_version", V);
          location.reload(true);
        });
        return;
      }
      localStorage.setItem("site_version", V);
      location.reload(true);
      return;
    }
    localStorage.setItem("site_version", V);
  } catch(e) {}
})();
