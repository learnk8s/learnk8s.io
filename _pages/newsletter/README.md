# LearnK8s Newsletter


## Newsletter Issue Content

Each issue can include the following sections:

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
    description: "An optional description for the open graph. The main description will be used if none is entered here."

```

You will need to replace the `date` and  `issue` from the above example with the ones relevant to the issue you're drafting.

#### Adding data to the new issue's sections

Depending on which section you'd like to include in the issue, you will need to add their relevant information as follows.

##### Editor's Pick

To add the editor's pick section to the issue you must have at least one item. This should be added tot he front-matter as follows:

```yaml

 ...cont

editor_pick:
  - title: "The journey from monolith to Docker to Kubernetes: part 1"
    url: "https://devops.college/the-journey-from-monolith-to-docker-to-kubernetes-part-1-f5dbd730f620"
    image: ed_pick_1.png
    summary: "'Why' and 'How' to go from a monolith app to dockerized one and eventually to run our app on a kubernetes cluster. In part one, the author discusses the benefits and the abilities of Docker and the app's code architecture."
    tags: [docker, micro services]
  - title: "Dissecting Kubernetes deployments"
    url: "https://blog.heroku.com/dissecting-kubernetes-deployments"
    summary: Twitter's team have been developing a design system they call Horizon. Ashlie Ford tracks its journey, from humble beginnings as a hack-day project.
    tags: [deployments]
```

The example above includes two editor's picks. The image is optional, as you can see the second item does not have one. Images must be saved in the same directory as the issue.
