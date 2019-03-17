import {Image, CSSBundle, JSScript, JSBundle} from '../assets'
import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Markdown, Article, RelatedConentContainer, RelatedContentItem } from '../article'
import { renderToStaticMarkup } from 'react-dom/server'
import { cat } from 'shelljs'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { ListItem } from '../layout'

export const Details = {
  type: identity<'kubectlProductivity'>('kubectlProductivity'),
  url: '/kubectl-productivity',
  seoTitle: 'Boosting your kubectl productivity ♦︎ Learnk8s',
  title: 'Boosting your kubectl productivity',
  shortDescription: `If you work with Kubernetes, you use kubectl. This article contains a set of tips and tricks to make your usage of kubectl more efficient.`,
  description: `If you work with Kubernetes, you use kubectl. And you probably use it a lot. Whenever you spend a lot of time working with a specific tool, it is worth to get to know it very well in order to use it efficiently. This article contains a set of tips and tricks to make your usage of kubectl more efficient.`,
  openGraphImage: Image({url: 'src/advancedKubectl/magic.jpg', description: 'Advanced kubectl usage'}),
  publishedDate: '2019-01-24',
  previewImage: Image({url: 'src/advancedKubectl/magic.jpg', description: 'Advanced kubectl usage'}),
  author: {
    fullName: 'Daniel Weibel',
    avatar: Image({url: 'assets/authors/daniel_weibel.jpg', description: 'Daniel Weibel'}),
    link: 'https://medium.com/@weibeld'
  },
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  const {css, js, html} = Markdown(cat('src/advancedKubectl/content.md').toString(), __dirname)
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
      styles: css.concat(`.pagination-icon {
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: .125rem;
  display: inline-block;
  width: 0.4rem;
}`)
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
        <a href={getFullUrl(website.children.blog.children.spotInstances)} className='link navy underline hover-sky'>How to practice chaos engineering and reduce costs</a> with Kubernetes and spot instances.
      </RelatedContentItem>
      <RelatedContentItem>
        <a href={getFullUrl(website.children.blog.children.scalingSpringBoot)} className='link navy underline hover-sky'>Scaling Microservices with Message Queues, Spring Boot and Kubernetes.</a> Learn how to use the Horizontal Pod Autoscaler to resize your fleet of applications dynamically.
      </RelatedContentItem>
    </RelatedConentContainer>

    <div className='pt4'>
      <p className='lh-copy f5 black-70'>↓ Caution: shameless plug ahead! Continue reading below ↓</p>
      <h2 className='f2 pt0 pb2 mt2'>Become an expert at deploying and scaling applications in Kubernetes</h2>
      <p className='lh-copy measure-wide f4'>Sign up for the Learnk8s Academy — a self-paced online course designed to dive into the details of Kubernetes.</p>
      <p className='lh-copy measure-wide f4'>Learn how to:</p>
      <ul className='list ph3'>
        <ListItem>Master Kubernetes networking and handle the busiest traffic websites without breaking a sweat</ListItem>
        <ListItem>Scale your jobs to thousands of servers and reduce the waiting time from days to minutes</ListItem>
        <ListItem>Design clusters that are reliable and enjoy peace of mind knowing that your apps are highly available with a multi-cloud setup</ListItem>
        <ListItem>Optimise server density with containers and Kubernetes and save a ton of cash on your cloud bill by using only the resources you need</ListItem>
        <ListItem>Supercharge your delivery pipeline and deploy application around the clock</ListItem>
      </ul>
      <div className='pt2 pb4'>
        <a href={getFullUrl(website.children.academy)} className='link dib white bg-blue br1 pa3 b f5 shadow-3 mv3'>Join the Learnk8s Academy →</a>
      </div>
      <p className='lh-copy f5'>P.S. Don't miss the next experiment, insight, or <span className='b'>discount</span>: <a href={getFullUrl(website.children.newsletter)} className='link navy underline hover-sky'>subscribe to the mailing list!</a></p>
    </div>

    <JSScript js={JSBundle({
      scripts: js.concat(`{(${Slideshow.toString()})()}`),
    })}/>
  </Article>)
}

function Slideshow() {
  function setupSlideshow(root: HTMLElement) {
    const width = root.offsetWidth
    const slides = [].slice.call(root.querySelectorAll('li')) as HTMLElement[]
    const slider = root.querySelector<HTMLElement>('.slider-js')
    if (!slider) {
      return console.log(`I couldn't find the slider`)
    }
    slider.style.width = `${width * slides.length}px`
    slider.classList.add('flex')
    slides.forEach(slide => slide.style.width = `${width}px`)

    function createEmptyNav() {
      const emptyNav = document.createElement('div')
      emptyNav.classList.add('w-20')
      emptyNav.innerHTML = '&nbsp;'
      return emptyNav
    }

    slides.forEach((slide, index, items) => {
      const leftNav = document.createElement('div')
      leftNav.classList.add('f6', 'b', 'black-50', 'pv3', 'pointer', 'w-20')
      leftNav.innerHTML = `<svg viewBox='0 0 10 16' xmlns='http://www.w3.org/2000/svg' class='pagination-icon mr2'>
    <polyline fill='none' vectorEffect='non-scaling-stroke' points='8,2 2,8 8,14'></polyline>
  </svg>
  <span class='ttu'>Previous</span>`
      leftNav.onclick = () => root.scrollLeft -= width
      const rightNav = document.createElement('div')
      rightNav.classList.add('f6', 'b', 'black-50', 'pv3', 'pointer', 'w-20', 'tr')
      rightNav.innerHTML = `<span class='ttu'>Next</span>
  <svg viewBox='0 0 10 16' xmlns='http://www.w3.org/2000/svg' class='pagination-icon ml2'>
    <polyline fill='none' vectorEffect='non-scaling-stroke' points='2,2 8,8 2,14'></polyline>
  </svg>`
      rightNav.onclick = () => root.scrollLeft += width
      const navigation = slide.querySelector('.navigation-js')
      if (!navigation) {
        return console.log(`I couldn't find the navigation`)
      }
      navigation.prepend(index === 0 ? createEmptyNav() : leftNav)
      navigation.append(index === items.length - 1 ? createEmptyNav() : rightNav)
    })

  }
  document.querySelectorAll<HTMLElement>('.slideshow-js').forEach(setupSlideshow)
}
