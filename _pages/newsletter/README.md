# LearnK8s Newsletter


## Newsletter Issue Content

Each issue can have the following section:

__1) Editor's Pick__

One or more links to articles selected by the newsletter editor.


__2) Watch out for these projects__

One or more relevant projects from GitHub.


__3) Your Picks__


One or more links to articles and external content suggested by our readers.

__4) Things that made us laugh__

One or more funny tweets or memes. Should be relevant to our readers.

__5) Popular Tweets__

One or more popular tweets which are relevant to our readers. 

### Drafting a new issue

Create a new new directory named `issue-xx` under the `_newsletter` collection directory. Replace the `xx` with the next issue's number.

Following this, create an `index.md` file under the newly created directory. This will hold the content's of the newsletter.

Then add the generic front-matter in the `index.md` file:

```yaml
date: 2018-06-17
issue: 1

description: "Some text describing this newsletter issue. The description is shown in search engine results so it should be kept short and under 300 characters."

excerpt: "Some text describing this newsletter issue. The except is shown in the newsletetr archive page."

open_graph:
    description: "An optional description for the open graph. The main description will be sued if none is entered here."

```

You will need to replace the `date` and  `issue` from the above example with the ones relevant to the issue you're drafting.



