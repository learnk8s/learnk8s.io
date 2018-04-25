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
		getTwitterUrl(),
		'shareWindow',
		'location=1,toolbar=1,menubar=1,resizable=1,width=400,height=300'
	)
	console.log(
		'\nDebug TEXT length:  \n' + getTweetText().length
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

/**
 * Gets the url for sharing on Twitter.
 *
 * @return {string}
 */
function getTwitterUrl () {
	return 'https://twitter.com/intent/tweet?text=' + getTweetText() +
		'&via=' + getTwitterUsername() + '&url=' + getArticleUrl()
}

/**
 * Gets the formatted twitter URL query text parameter
 *
 * @return string
 */
function getTweetText () {
	var title = getArticleTitle()

	if (tweetExceedsAllowedLength()) {
		title = trimArticleTitleForTweet()
	}

	title = title.split(' ').join('+')
	return title
}

/**
 * Trims the article length to fit in a tweet.
 *
 * @return {string}
 */
function trimArticleTitleForTweet () {
	var title = getArticleTitle()
	var moreText = ' ..'
	var numberOfCharsToTrim = calculateNumberOfCharactersToTrimFromArticleTitle()
		+	moreText.length

	title = title.substr(0, (title.length - numberOfCharsToTrim))
	return  title + moreText
}

/**
 * Checks if the tweet's content exceeds the
 * standard tweet amount, taking into account
 * the username and the url.
 *
 * @return {boolean}
 */
function tweetExceedsAllowedLength () {
	var allowedTweetLength = 280
	var articleTitleLength = getArticleTitle().length + 1 // trailing space
	var shortenedUrlLength = 24 // 23 + trailing space
	var userNameLength = 13 // via @learnk8s
	var tweetLength = articleTitleLength + shortenedUrlLength + userNameLength
	return tweetLength > allowedTweetLength
}

/**
 * Gets the number of available characters within a tweet
 * after reducing the url and username.
 *
 * @return {number}
 */
function calculateNumberOfCharactersToTrimFromArticleTitle() {
	var standardTweetLength = 280
	var articleTitleLength = getArticleTitle().length + 1 // trailing space
	var shortenedUrlLength = 24 // 23 + trailing space
	var userNameLength = 13 // "via @learnk8s"
	var availableCharacters = standardTweetLength - shortenedUrlLength -
		userNameLength

	return articleTitleLength - availableCharacters
}

/**
 * Article title length: 315 + 1 = 316
 * Url and username length = 37
 *
 * Available chars: 280 - 37 = 243
 *
 * Text should be trimmed by: 316 - 243 = 73
 *
 * Text length should be: 280 - 37 = 243
 */



/**
 * Gets the Twitter's username.
 *
 * @return {string}
 */
function getTwitterUsername () {
	return 'learnk8s'
}

/**
 * Gets the article's url.
 * @return {string}
 */
function getArticleUrl () {
	return '{{site.url}}{{page.url}}'
}

/**
 * Gets the Article's title.
 *
 * @return {string}
 * @todo
 */
function getArticleTitle () {
	return '{{page.title}}' + '{{page.title}}' + '{{page.title}}' + '{{page.title}}' + '{{page.title}}' + '{{page.title}}' + '{{page.title}}' + '{{page.title}}' + '{{page.title}}'
}


