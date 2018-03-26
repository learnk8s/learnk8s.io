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
	);
	return false;
}

function shareOnTwitter () {
	window.open(
		'https://twitter.com/share?url={{ site.url }}{{ page.url }}',
		'shareWindow',
		'location=1,toolbar=1,menubar=1,resizable=1,width=400,height=300'
	);
	return false;
}

function shareOnGooglePlus () {
	window.open(
		'https://plus.google.com/share?url={{ site.url }}{{ page.url }}',
		'shareWindow',
		'location=1,toolbar=1,menubar=1,resizable=1,width=400,height=300'
	);
	return false;
}

function shareOnLinkedIn () {
	window.open(
		'http://www.linkedin.com/shareArticle?mini=true&amp;url={{ site.url }}{{ page.url }}',
		'shareWindow',
		'location=1,toolbar=1,menubar=1,resizable=1,width=400,height=300'
	);
	return false;
}

function shareByEmail () {
	window.open(
		'mailto:?Subject={{ page.title }}&amp;Body={{ site.url }}{{ page.url }}',
		'shareWindow',
		'location=1,toolbar=1,menubar=1,resizable=1,width=400,height=300'
	);
	return false;
}

