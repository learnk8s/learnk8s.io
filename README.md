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

## Dev environment

For each pull request, a development preview is created with Netlify (link is in the `deploy/netlify` task on the pull request page).
