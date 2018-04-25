/**
 * Social sharing JavaScript
 *
 * Forces the share links to open in a new and sized
 * window.
 */
function openShareWindow (element, width, height) {

	var href = element.getAttribute('href')
	if (element.getAttribute('id') === 'twitter-share') {
		href = getTwitterUrl()
	}

	window.open(
		href,
		'shareWindow',
		'location=1,toolbar=1,menubar=1,resizable=1,width=' + (width || 400) +
		',height=' + (height || 300)
	)
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
 * Gets the url for sharing on Twitter.
 *
 * @return {string}
 */
function getTwitterUrl () {
	return 'https://twitter.com/intent/tweet?text=' + getTweetText() +
		'&via=' + getTwitterSetting('username') + '&url=' + getArticleUrl()
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
		+ moreText.length

	title = title.substr(0, (title.length - numberOfCharsToTrim))
	return title + moreText
}

/**
 * Checks if the tweet's content exceeds the
 * standard tweet amount, taking into account
 * the username and the url.
 *
 * @return {boolean}
 */
function tweetExceedsAllowedLength () {
	var allowedTweetLength = getTwitterSetting('allowed_tweet_length')
	var articleTitleLength = getArticleTitle().length + 1 // trailing space
	var shortenedUrlLength = getTwitterSetting('shortened_url_length') + 1 // trailing space
	var userNameLength = getTwitterSetting('username_display_length')
	var tweetLength = articleTitleLength + shortenedUrlLength + userNameLength
	return tweetLength > allowedTweetLength
}

/**
 * Gets the number of available characters within a tweet
 * after reducing the url and username.
 *
 * @return {number}
 */
function calculateNumberOfCharactersToTrimFromArticleTitle () {
	var allowedTweetLength = getTwitterSetting('allowed_tweet_length')
	var articleTitleLength = getArticleTitle().length + 1 // trailing space
	var shortenedUrlLength = getTwitterSetting('shortened_url_length') + 1 // trailing space
	var userNameLength = getTwitterSetting('username_display_length')
	var availableCharacters = allowedTweetLength - shortenedUrlLength -
		userNameLength

	return articleTitleLength - availableCharacters
}

/**
 * Gets the twitter setting.
 *
 * @param name
 * @return {*}
 */
function getTwitterSetting (name) {
	var settings = {
		'allowed_tweet_length': 280,
		'shortened_url_length': 23,
		'username_display_length': 13, // via @learnk8s
		'username': 'learnk8s'
	}
	return settings[name]
}

/**
 * Gets the article's url.
 * @return {string}
 */
function getArticleUrl () {
	return '{{ page.url | absolute_url }}'
}

/**
 * Gets the Article's title.
 *
 * @return {string}
 */
function getArticleTitle () {
	return '{{page.title}}'
}

/**
 * Calls the actOnScroll method when
 * the window is scrolling.
 */
window.onscroll = function () {actOnScroll()}
