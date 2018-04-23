/**
 * Social sharing JavaScript
 *
 * Forces the share links to open in a new and sized
 * window.
 */
function openNewWindow(element, width, height) {
  window.open(
    element.getAttribute('href'),
    'shareWindow',
    'location=1,toolbar=1,menubar=1,resizable=1,width=' + (width || 400) + ',height=' + (height || 400)
  )
}

/**
 * Handles the scroll event.
 */
function actOnScroll() {
  var socialShareContainer = document.getElementById('social-share-container')

  // Skip if the links are not floating
  if (window.getComputedStyle(socialShareContainer).getPropertyValue('position') !== 'fixed') {
    return;
  }

  var article = document.querySelector('.article')
  socialShareContainer.style.display = isVisible({
    element: article,
    offsetFromStartInPercentage: -0.4,
    offsetFromEndInPercentage: 0.4
  }) ? 'block' : 'none'
}

/**
 * Checks if the given element is in view port.
 *
 * @return {boolean}
 */
function isVisible(options) {
  var rect = options.element.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  if (elemTop >= options.offsetFromStartInPercentage * window.innerHeight ||
    elemBottom <= options.offsetFromEndInPercentage * window.innerHeight) {
    return false
  }

  return true
}

/**
 * Calls the actOnScroll method when
 * the window is scrolling.
 */
window.onscroll = actOnScroll