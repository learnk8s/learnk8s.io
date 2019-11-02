# Markdown rendering engine

## Printing

You might find the following resources useful for learning CSS for print:

- [A Guide To The State Of Print Stylesheets In 2018](https://www.smashingmagazine.com/2018/05/print-stylesheets-in-2018/)
- [Designing For Print With CSS](https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/)
- [Weasyprint documentation](https://weasyprint.readthedocs.io/en/stable/features.html#css)

The current workflow for generating ebooks is to run [Weasyprint](https://weasyprint.org/) with:

```bash
weasyprint http://localhost:3000/knote/.pdf /tmp/knote.pdf
```
