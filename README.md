# learnk8s

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
