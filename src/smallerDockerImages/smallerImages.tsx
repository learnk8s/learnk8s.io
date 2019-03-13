import {Image, CSSBundle, JSBundle, JSScript} from '../assets'
import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Article, Markdown, RelatedConentContainer, RelatedContentItem } from '../article'
import { renderToStaticMarkup } from 'react-dom/server'
import { cat } from 'shelljs'
import { ListItem } from '../layout'
import { BlogPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'

export const Details = {
  type: identity<'smaller_images'>('smaller_images'),
  url: '/smaller-docker-images',
  seoTitle: '3 simple tricks for smaller Docker images ♦︎ Learnk8s',
  title: '3 simple tricks for smaller Docker images',
  description: `When it comes to building Docker containers, you should always strive for smaller images. Images that share layers and are smaller in size are quicker to transfer and deploy. But how do you keep the size under control when every RUN statement creates a new layer, and you need intermediate artefacts before the image is ready?`,
  openGraphImage: Image({url: 'src/smallerDockerImages/smaller_images.png', description: 'Docker whale'}),
  publishedDate: '2018-02-12',
  previewImage: Image({url: 'src/smallerDockerImages/smaller_images.png', description: '3 simple tricks for smaller Docker images'}),
  author: {
    fullName: 'Daniele Polencic',
    avatar: Image({url: 'assets/authors/daniele_polencic.jpg', description: 'Daniele Polencic'}),
    link: 'https://linkedin.com/in/danielepolencic'
  },
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  const {css, js, html} = Markdown(cat('src/smallerDockerImages/content.md').toString())
  return renderToStaticMarkup(<Article
    website={website}
    siteUrl={siteUrl}
    seoTitle={currentNode.payload.seoTitle}
    title={currentNode.payload.title}
    description={currentNode.payload.description}
    openGraphImage={currentNode.payload.openGraphImage}
    absolutUrl={getAbsoluteUrl(currentNode, siteUrl)}
    authorFullName={currentNode.payload.author.fullName}
    authorAvatar={currentNode.payload.author.avatar}
    authorLink={currentNode.payload.author.link}
    cssBundle={CSSBundle({
      paths: [
      'src/prism-solarizedlight.css',
      'src/prism-line-highlight.css',
      ],
      styles: css
    })}>
    <JsonLd<BlogPosting> item={{
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: currentNode.payload.title,
      image: `${siteUrl}${currentNode.payload.previewImage.url}`,
      author: {
        '@type': 'Person',
        name: currentNode.payload.author.fullName,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Learnk8s',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}${Image({url: 'assets/learnk8s_logo_square.png', description: 'Learnk8s logo'}).url}`,
        },
      },
      url: getAbsoluteUrl(currentNode, siteUrl),
      datePublished: currentNode.payload.publishedDate,
      dateModified: currentNode.payload.publishedDate,
      description: currentNode.payload.description,
      mainEntityOfPage: {
        '@type': 'SoftwareSourceCode',
      }
    }}></JsonLd>
    <div dangerouslySetInnerHTML={{__html: html}}></div>

    <RelatedConentContainer>
      <RelatedContentItem link={getFullUrl(website.children.blog.children.installingK8sOnWindows)}>{website.children.blog.children.installingK8sOnWindows.payload.title}</RelatedContentItem>
      <RelatedContentItem link={getFullUrl(website.children.blog.children.chaosEngineering)}>{website.children.blog.children.chaosEngineering.payload.title}</RelatedContentItem>
    </RelatedConentContainer>

    <div className='pt4'>
      <p className='lh-copy f5 black-70'>↓ Caution: shameless plug ahead! Continue reading below ↓</p>
      <h2 className='f2 pt0 pb2 mt2'>Become an expert at deploying and scaling applications in Kubernetes</h2>
      <p className='lh-copy measure-wide f4'>But how do you deal with thousands of <span className='i'>small</span> containers?</p>
      <p className='lh-copy measure-wide f4'>You should learn how to leverage a container orchestrator such as Kubernetes.</p>
      <p className='lh-copy measure-wide f4'>You can get a head start with our hands-on courses and learn how to master scalability in the cloud.</p>
      <p className='lh-copy measure-wide f4'>Learn how to:</p>
      <ul className='list ph3'>
        <ListItem>Handle the busiest traffic websites without breaking a sweat</ListItem>
        <ListItem>Scale your jobs to thousands of servers and reduce the waiting time from days to minutes</ListItem>
        <ListItem>Enjoy peace of mind knowing that your apps are highly available with a multi-cloud setup</ListItem>
        <ListItem>Save a ton of cash on your cloud bill by using only the resources you need</ListItem>
        <ListItem>Supercharge your delivery pipeline and deploy application around the clock</ListItem>
      </ul>
      <div className='pt2 pb4'>
        <a href={getFullUrl(website.children.training)} className='link dib white bg-blue br1 pa3 b f5 shadow-3 mv3'>Become an expert →</a>
      </div>
      <p className='lh-copy f5'>P.S. Don't miss the next experiment, insight, or <span className='b'>discount</span>: <a href={getFullUrl(website.children.newsletter)} className='link navy underline hover-sky'>subscribe to the mailing list!</a></p>
    </div>

    <JSScript js={JSBundle({
      scripts: js,
      paths: [
        'src/smallerDockerImages/anime.min.js',
        'src/smallerDockerImages/isScrolledIntoView.js',
      ]
    })}/>
  </Article>)
}