;(function () {
  const cache = [];
  function onScrollIntoView(element, callback) {
    cache.push([element, callback]);
  }
  function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  window.addEventListener('scroll', e => {
    requestAnimationFrame(() => {
      cache.forEach(([element, callback]) => {
        if (isScrolledIntoView(element)) callback.call();
      });
    })
  })

  window.onScrollIntoView = onScrollIntoView;
})();