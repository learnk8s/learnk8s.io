# learnk8s

## How to create a blog post

You should store posts in the `_blog` folder. Usually, Jekyll stores blog posts in the `_posts` folder. However, that prevents posts from having locally scoped assets such as images or code. In fact, you're only allowed to have flat files and not folders under `_posts`.

> While [there's a plugin to work around the challenge of having locally scoped assets](https://github.com/nhoizey/jekyll-postfiles), it's not ideal. It breaks compatibility with other plugins, and it is difficult to reason about tags such as the include_relative. It's also not actively maintained.

The name of the folder in `_blog` is also the URL of the post. The article should be named `index` — if you're using markdown, that's `index.md`.

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
$ bundle exec jekyll serve -H 0.0.0.0 --incremental --drafts
```

## Deployment

The code is deployed on build with

```bash
$ jekyll build
```
