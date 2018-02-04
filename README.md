# learnk8s

## How to create a blog post

You should store posts in the `_blog` folder. Usually, Jekyll stores blog posts in the `_posts` folder. However, that prevents posts from having locally scoped assets such as images or code. In fact, you're only allowed to have flat files and not folders under `_posts`.

> While [there's a plugin to work around the challenge of having locally scoped assets](https://github.com/nhoizey/jekyll-postfiles), it's not ideal. It breaks compatibility with other plugins, and it is difficult to reason about tags such as the include_relative. It's also not actively maintained.

The name of the folder in `_blog` is also the URL of the post. The article should be named `index` — if you're using markdown, that's `index.md`.

You can include resources with [the include_relative tag](https://jekyllrb.com/docs/includes/#including-files-relative-to-another-file).

Using a non-standard approach to store blog posts has some pros and cons. Here's a list of cons:

- The URL of the post is "<folder name>/index". The _index_ should be removed
- All resources within the post folder are copied across.
- You should iterate through the collection with `for item in site.<collection name>`
- Drafts are not possibile with collections

## Running locally

Install dependencies with:

```bash
$ yarn install
```

Run the code in watch mode with:

```bash
$ yarn dev
```

## Deployment

The code is deployed on build with

```bash
$ yarn run build
```
