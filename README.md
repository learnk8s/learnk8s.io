# Learnk8s website

## How to create a new article

1. Make a copy of an existing article:
    ```bash
    cp -r src/custom-authentication src/my-article
    cd src/my-article
    ```

1. Adapt the index file of the article:
    ```bash
    vim index.tsx
    ```

1. Clear the content file:
    ```bash
    echo "Hello world" >content.md
    ```

1. Adapt the footer file with related articles:
    ```bash
    vim content-related.md
    ```

1. Clear the assets directory:
    ```bash
    rm assets/*
    ```

1. Register the article in `src/register.ts`:
    ```bash
    vim ../register.ts
    ```

1. Try to build and run the website:
    ```bash
    ENVENTBRITE_TOKEN=1 ENVENTBRITE_ORG=1 npm run build && npm start
    ```

## How to run the website locally

Install dependencies:

```bash
npm ci
```

Build:

```bash
ENVENTBRITE_TOKEN=1 ENVENTBRITE_ORG=1 npm run build
```

or, if you're on Windows:

```powershell
$Env:ENVENTBRITE_TOKEN=1
$Env:ENVENTBRITE_ORG=1
npm run build
```

Run:

```bash
npm start
```

The command starts a REPL session.

Type `.help` to reveal the list of commands available.

## Development preview

For each pull request, a development preview is created with Netlify. The link is in the `deploy/netlify` task on the pull request page on GitHub.

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
