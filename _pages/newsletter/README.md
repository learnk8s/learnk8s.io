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

__6) Content__

Other content can be added to the newsletter's issue.

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

Depending on which sections you'd like to include in the issue, you will need to add their relevant information as follows:

##### Editor's Pick

To add the editor's pick section to the issue you must have at least one item. This should be added to the front-matter as follows:

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

##### Watch out for these projects

Same as the editor's pick, if you wish to feature one or more project, you will need to add the following front-matter data:

```yaml

...cont

projects:
  - name: "kubernetes-helm/chartmuseum"
    stars: 517
    forks: 66
    url: "https://github.com/kubernetes-helm/chartmuseum"
    image: project_1.png
    summary: "ChartMuseum is an open-source Helm Chart Repository written in Go (GoLang), with support for cloud storage backends, including Google Cloud Storage, Amazon S3, and Microsoft Azure Blob Storage."
  - name: "pusher/k8s-auth-example"
    stars: 20
    forks: 6
    url: "https://github.com/pusher/k8s-auth-example"
    summary: "Example Kubernetes Authentication helper. This is an example of how to connect to an OIDC provider and authenticate users before configuring their kubeconfig."

```

The above example also includes two projects and the image is also optional.

##### Your Picks

The "Your Picks" pre-set section is fairly similar to the "Editor's Pick" section. This section shows a list of article (or other content) submitted by our readers. In order to include this section, you must have at least one submission (user pick) and at them to the front-matter data as described here:

```yaml

...cont

user_pick:
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

The example above includes two user picks. All the data is required with exclusion of the image which is optional.

##### Things that made us laugh

Currently, we can add two types of things that made us laugh. These are _memes_ and _tweets_.

As with other sections, you must include the content as the issue's front-matter for it to show up. You can do this as follows:

```yaml

...cont

laughs:
  - type: meme
    text: "That feeling when you realise that someone comes to you and you realize that they just reinvented Helm"
    image: laugh_1.png
    tweetable: true
  - type: meme
    text: "Every github user right now!"
    image: laugh_2.jpg
    tweetable: true
    twitter_pic: wnByFoAwgs
  - type: tweet
    text: "When the inventor of the USB stick dies they'll gently lower the coffin, then pull it back up, turn it the other way, then lower it again."
    user: "cluedont"
    full_name: "cluedont"
    avatar: cluedont.jpeg
    url: "https://twitter.com/cluedont/status/482614101764763648"
    date: 2014-06-27
  - type: tweet
    text: "#JavascriptIsToJavaAsHamIsToHamster"
    user: "sitemeer"
    full_name: "Sitemeer"
    avatar: sitemeer.png
    url: "https://twitter.com/sitemeer/status/907581822783148032"
    date: 2017-09-12
    image: laugh_4.jpg

```

This examples includes four items. Two _memes_ and two _tweet_. You can include as many tweets and memes as needed.

__Memes:__

Memes should include text, image or both. If the tweetable property is set to true, then a _click to tweet_ link will be displayed. Please note that in order for the _meme_ image to be tweeted, a Twitter picture URL must be supplied as shown in the second item/example: `twitter_pic: wnByFoAwgs`.

__Tweets:__

All the properties except for the image in the example are required for tweets to be displayed properly.

- The `text` property refers to the tweet's content.
- The `user` property refers to the Twitter username of the tweet's author.
- The `full_name` property refers to the Twitter display name of the tweet's author.
- The `avatar` property refers to the Twitter profile photo of the tweet's author.
- The `url` property refers to the link of the tweet.
- The `date` property refers to the date when the tweet was posted.
- The `image` property is optional. Included images must be located within the same directory as the issue.

##### Popular Tweets

In this section you can list one or more Tweets you deem popular. To add this section, simply add the following data to the front-matter with at least one tweet.

```yaml

...cont

popular_tweets:
 - user: kubernetesio
   full_name: Kubernetes
   avatar: kubernetesio.png
   url: https://twitter.com/kubernetesio/status/1011339341489045504
   date: 2017-06-25
   text: "We didn’t change our organization because we wanted to use #Kubernetes, we used Kubernetes because we wanted to change our organization."
 - user: Azure
   full_name: Microsoft Azure
   avatar: Azure.jpg
   url: https://twitter.com/Azure/status/1009598024874643461
   date: 2017-06-21
   text: "Want to learn how to choose the right #Kubernetes objects for running workloads in Azure? Download our eBook."
   image: popular_tweet_1jpg

```

The above example includes two popular tweets. All the properties are required, excluding the image which is optional. If the tweet contains an image, the image should be saved in the same directory of the newsletter's issue.


#### Content

As with all Jekyll's pages, you can add any additional to the newsletter's issue. The content can be written in markdown and html. You can also include liquid `tags` and `includes`. The content is written after the the three dashes `---` at the end of the front-matter. By default the content is displayed underneath the sections described in the front-matter.

__Note:__

If a particular type of content is used regularly, it may be better to consider creating a new section type or an include file to avoid repetitive work.

#### Sort order

By default, the sections are displayed in the same order as they are documented here and the `content` as a last item before the footer. I.e:

|Section Id|Section Name|Sort Order|
|:---------|:-----------|---------:|
|editor_pick|Editor's Pick|1|
|projects|Watch out for these projects|2|
|user_pick|Your Picks|3|
|laughs|Things that made us laugh|4|
|popular_tweets|Popular Tweets|5|
|content|The file's content|6|

The sort order of the sections can be changed for each issue without the need to edit the `newsletter` layout. To change the section's order, add the following front-matter:

```yaml

...cont

section_order:
  - user_pick
  - editor_pick
  - projects
  - content
  - popular_tweets
  - laughs

```

__You should only list the sections which you want to display.__

__You don't have to add the above front-matter if you're happy with the default sort order.__


The example above details how the sort order of each section, including the `content` can be customised. This example will display the section in this order:

|Section Id|Section Name|Display Order|
|:---------|:-----------|:--------:|
|user_pick|Your Picks|First|
|editor_pick|Editor's Pick|Second|
|projects|Watch out for these projects|Third|
|content|The file's content|Fourth|
|popular_tweets|Popular Tweets|Fifth|
|laughs|Things that made us laugh|Sixth|
