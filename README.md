# Learnk8s website

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
npm install
```

You can compile the website with:

```bash
npx ts-node --files src/index.tsx
```

You can serve the website with:

```bash
npx http-serve _site -p 4000
```