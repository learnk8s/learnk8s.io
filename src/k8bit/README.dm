# Caputuring and rendering a screencast

You can capture a screencast with:

```bash
asciinema rec
```

Once the `.cast` file is saved locally, you can use [svg-term-cli](https://github.com/marionebl/svg-term-cli) to render the cast as an animated gif:

```bash
cat my.cast | npx svg-term-cli --out output.svg --window --padding 10
```
