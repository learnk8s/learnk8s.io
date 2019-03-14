import {Image, CSSBundle, JSScript, JSBundle} from '../assets'
import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Markdown, Article, RelatedConentContainer, RelatedContentItem } from '../article'
import { cat } from 'shelljs'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { ListItem } from '../layout'


export const Details = {
  type: identity<'spotInstances'>('spotInstances'),
  url: '/kubernetes-spot-instances',
  seoTitle: 'Spot instances in Kubernetes ♦︎ Learnk8s',
  title: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes',
  shortDescription: `How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances.`,
  description: `Spot Instances are unused servers that are available for less than the regular price. Therefore, you can significantly save on your infrastructure costs. It does come with a price, though. Your cloud provider can take away your spot instance at any time, and give to another client who has requested it at a standard cost. How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances.`,
  openGraphImage: Image({url: 'src/spotInstances/cheap-cluster.jpg', description: 'Serving cheaper servers'}),
  publishedDate: '2018-11-06',
  previewImage: Image({url: 'src/spotInstances/cheap-cluster.jpg', description: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes'}),
  author: {
    fullName: 'César Tron-Lozai',
    avatar: Image({url: 'assets/authors/césar_tron-lozai.jpg', description: 'César Tron-Lozai'}),
    link: 'https://twitter.com/cesartronlozai'
  },
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  const {css, js, html} = Markdown(cat('src/spotInstances/content.md').toString(), __dirname)
  return renderToStaticMarkup(<Article
    website={website}
    siteUrl={siteUrl}
    seoTitle={currentNode.payload.seoTitle}
    title={currentNode.payload.title}
    description={currentNode.payload.shortDescription}
    openGraphImage={currentNode.payload.openGraphImage}
    absolutUrl={getAbsoluteUrl(currentNode, siteUrl)}
    authorFullName={currentNode.payload.author.fullName}
    authorAvatar={currentNode.payload.author.avatar}
    authorLink={currentNode.payload.author.link}
    cssBundle={CSSBundle({
      paths: [
        'node_modules/tachyons/css/tachyons.css',
        'src/prism-solarizedlight.css',
        'src/prism-line-highlight.css',
        'assets/style.css',
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
      <RelatedContentItem>
        <a href={getFullUrl(website.children.blog.children.installingK8sOnWindows)} className='link navy underline hover-sky'>Getting started with Docker and Kubernetes on Windows 10</a> where you'll get your hands dirty and install Docker and Kubernetes in your Windows environment.
      </RelatedContentItem>
      <RelatedContentItem>
        <a href={getFullUrl(website.children.blog.children.scalingSpringBoot)} className='link navy underline hover-sky'>Scaling Microservices with Message Queues, Spring Boot and Kubernetes</a> Learn how to use the Horizontal Pod Autoscaler to resize your fleet of applications dynamically.
      </RelatedContentItem>
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
        'src/spotInstances/anime.min.js',
        'src/spotInstances/isScrolledIntoView.js',
      ]
    })}/>
  </Article>)
}