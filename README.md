# learnk8s

## How to create a blog post

You should store posts in the `_blog` folder. Usually, Jekyll stores blog posts in the `_posts` folder. However, that prevents posts from having locally scoped assets such as images or code. In fact, you're only allowed to have flat files and not folders under `_posts`.

> While [there's a plugin to work around the challenge of having locally scoped assets](https://github.com/nhoizey/jekyll-postfiles), it's not ideal. It breaks compatibility with other plugins, and it is difficult to reason about tags such as the include_relative. It's also not actively maintained.

The name of the folder in `_blog` is also the slug of the post. The article should be named `index` — if you're using markdown, that's `index.md`.

You can include resources with [the include_relative tag](https://jekyllrb.com/docs/includes/#including-files-relative-to-another-file).

Using a non-standard approach to store blog posts has some pros and cons. Here's a list of cons:

- The URL of the post is "<folder name>/index". The _link_ tag and generating permalink had to patched to play nicely.
- All resources within the post folder are copied across.
- You should iterate through the collection with `for item in site.<collection name>`
- Drafts are not possibile with collections

### Post Author

You can specify the author's name for every blog post by setting the front-matter property like so:

`author: "Author Name and Surname"`

You can also set the author's avatar for every blog post by setting the front-matter property like so:

`author_avatar: "author_name_and_surname.extension"`

Jekyll will find the avatar image file in `/assets`

Please note that if no `author` is specified, Jekyll will default to "Daniele Polencic".

On the other hand, if an `author` is specified but `author_avatar` is not, then Jekyll will try to find the images in `/assets` by using the author's name in lowercase and replaces "spaces" with an underscore. It will also assume that the image the extension is ".jpg".

If the above fails, then no image will be shown on top of the Author's name.

### Post Excerpt

You can specify the article's excerpt to be displayed in the article list
page by adding and setting the front-matter property:

`excerpt: "Your brief description"`

Please check how it looks and fits on the page once set.

### Links

If you need to include an external link, you can use an available `include
directive` as opposed to standard HTML. To do so, simply add the following to
 your article:

```
{% include link.external.html href="http://example.com" text="Text you want
to show" %}
```

___Optional arguments:___

As you might of assumed the `href` ad the `text` arguments are required in
order for link to be shown and to be directed appropriately. You can pass
additional arguments for the `title` and the `rel` options as follows:

1) Rel

The default setting if not stated is `rel=nofollow`. Setting this attribute
will override the default setting. For example, this setting:

```
{% include link.external.html href="http://example.com" text="Text you want
to show" rel="noopener" %}
```

will result as:

```html
<a href="http://example.com" rel="noopener">Text you want to show</a>
```

2) Title

If you do not specify a title, the text will be used by default. You can
override the default title by setting it, Like so:

```html
<a href="http://example.com" title="Your desired title">Text you want to
show</a>
```

## Redirecting old URLs

If you want to change the URL of an existing blog post and redirect the old URL to the new URL, you will need to follow some easy steps.

For example, you have a published post at this URL: `https://learnk8s.io/blog/my-post` and thus the content is located in `_blog/my-post/index.md`. Now you want to change the post's URL to `/blog/my-new-post` and you also want to redirect all hits from `/blog/my-post` to `/blog/my-new-post`.

1) Create a new directory `_blog/my-new-post`

2) Copy the content from `_blog/my-post` to the new directory

3) Update the front-matter of `_blog/my-new-post-index.md` so that it uses the resources from the new directory.

4) Delete all the contents of the `_blog/my-post` excluding the `index.md` file.

5) Update the front-matter of `_blog/my-post-index.md` so that it only includes the following:

```yaml
layout: redirect
redirect: "/blog/my-new-post"
```

In some cases you may need to make changes to the include statements in `styles.scss`.

You may also wish to keep all the resources in their original post directory and only copy the `index.md` file. On this case, you will not need to make any changes to the new post's front-matter links.



## Checking your writing

[Grammarly](https://www.grammarly.com/) is an app that assesses a piece of writing for common grammar mistakes and offers suggestions for correcting them.

The intent with Grammarly is to reduce the time necessary for code reviews and help us to improve our grammar skills in general at the same time.

### Create a Free Grammarly Account

Go to [https://www.grammarly.com/signin](https://www.grammarly.com/signin) and create a free Grammarly account.

### Check Posts with Grammarly

Prior to submitting a new blog post for review via Pull Request, please make sure that you check the content with Grammarly.

Grammarly currently does not support Markdown file import, so you will need to copy and paste your post content into a new file.

In the [My Grammarly](https://app.grammarly.com/), click the **New** icon to create a file. Then paste the contents of your post into the editor. Fortunately, Grammarly is good at ignoring things like code blocks so you shouldn't need to worry about being repeatedly told that `someFunction() {` is improper grammar.

When you paste your text, Grammarly sends the content to its servers and runs a grammar check. The number of issues is shown in the bottom right of the app. **Critical Issues** should be addressed. **Advanced Issues** are only available to paid users.

## Running locally

After you cloned the repository, cd in the project directory and run:

```bash
$ docker run -ti --rm -v ${PWD}:/app -p 4000:4000 ruby bash
```

You can install the dependencies with:

```bash
$ cd /app
$ bundle install
```

You can run an incremental build with:

```bash
$ bundle exec jekyll serve -H 0.0.0.0 --incremental
```

## Deployment

The code is deployed on build with

```bash
$ yarn install && jekyll build && yarn minify
```
