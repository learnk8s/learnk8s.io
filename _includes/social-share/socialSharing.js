/**
 * Social sharing JavaScript
 *
 * Forces the share links to open in a new and sized
 * window.
 */

function shareOnFacebook () {
	window.open(
		'http://www.facebook.com/sharer.php?u={{ site.url }}{{ page.url }}',
		'shareWindow',
		'location=1,toolbar=1,menubar=1,resizable=1,width=200,height=200'
	)
	return false
}

function shareOnTwitter () {
	window.open(
		'https://twitter.com/share?url={{ site.url }}{{ page.url }}',
		'shareWindow',
		'location=1,toolbar=1,menubar=1,resizable=1,width=400,height=300'
	)
	return false
}

function shareOnGooglePlus () {
	window.open(
		'https://plus.google.com/share?url={{ site.url }}{{ page.url }}',
		'shareWindow',
		'location=1,toolbar=1,menubar=1,resizable=1,width=400,height=300'
	)
	return false
}

function shareOnLinkedIn () {
	window.open(
		'http://www.linkedin.com/shareArticle?mini=true&amp;url={{ site.url }}{{ page.url }}',
		'shareWindow',
		'location=1,toolbar=1,menubar=1,resizable=1,width=400,height=300'
	)
	return false
}

/**
 * Handles the scroll event.
 */
function actOnScroll () {
	if (!isSmallScreen()) {
		var element = document.getElementById('social-share-container')
		if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200) {
			if (!timeToHide()) {
				element.style.display = 'block'
			} else {
				element.style.display = 'none'
			}
		} else {
			element.style.display = 'none'
		}
	} else {
		hideBottomShareButtonOnScrollDown()
	}
}

/**
 * Hides the share buttons of a small
 * screen device.
 */
function hideBottomShareButtonOnScrollDown () {
	var previous = window.scrollY
	var element = document.getElementById('bottom-social-share-container')
	window.addEventListener('scroll', function () {
		if (window.scrollY > previous) {
			element.className = 'slide-down'
			//element.style.display = 'none'
		} else {
			element.className = 'slide-up'
			//element.style.display = 'block'
		}
		previous = window.scrollY
	})
}

/**
 * Checks if the given element is in view port.
 *
 * @return {boolean}
 */
function timeToHide () {
	var visible = document.getElementById('mailing-list-container')
	var bounding = visible.getBoundingClientRect()
	if (
		bounding.top >= 0 &&
		bounding.left >= 0 &&
		bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
		bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
	) {
		return true
	} else {
		return false
	}
}

/**
 * Checks if the window is open on a small screen.
 *
 * @return {boolean}
 */
function isSmallScreen () {
	if (window.matchMedia('screen and (max-width: 1023px)').matches) {
		return true
	} else {
		return false
	}
}

/**
 * Calls the actOnScroll method when
 * the window is scrolling.
 */
window.onscroll = function () {actOnScroll()}

