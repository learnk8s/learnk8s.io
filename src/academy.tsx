import React from 'react'
import { LinkedNode, Sitemap, getAbsoluteUrl, getFullUrl } from './sitemap'
import { Navbar, Footer, Layout } from './layout.v2'
import { Course } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { renderToStaticMarkup } from 'react-dom/server'
import { resolve } from 'path'
import { PrimaryButton } from './homepage'

export const Details = {
  type: 'academy',
  url: '/academy',
  seoTitle: 'In-depth, hands-on Kubernetes online training ♦︎ Learnk8s Academy',
  title: 'In-depth, hands-on Kubernetes online training',
  description: `Learn Kubernetes from the comfort of wherever you are with step-by-step tutorial and guided, hands-on material.`,
  openGraphImage: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
} as const

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  return renderToStaticMarkup(
    <Layout
      website={website}
      seoTitle={currentNode.payload.seoTitle}
      title={currentNode.payload.title}
      description={currentNode.payload.description}
      openGraphImage={currentNode.payload.openGraphImage}
      absoluteUrl={getAbsoluteUrl(currentNode, siteUrl)}
    >
      <JsonLd<Course>
        item={{
          '@type': 'Course',
          '@context': 'https://schema.org',
          name: 'Architecting and scaling apps on Kubernetes',
          courseCode: 'K8SARCH',
          description: 'Self-paced Kubernetes online course: become an expert in deploying applications at scale.',
          educationalCredentialAwarded: 'CKAD (optional)',
          provider: {
            '@type': 'Organization',
            name: 'Learnk8s',
          },
        }}
      />
      <JsonLd<Course>
        item={{
          '@type': 'Course',
          '@context': 'https://schema.org',
          name: 'Zero to Kubernetes with Node.js',
          courseCode: 'K8SNODE',
          description: 'Learn how to develop, package and deploy Node.js applications on Kubernetes',
          educationalCredentialAwarded: 'Learnk8s certificate of completion',
          provider: {
            '@type': 'Organization',
            name: 'Learnk8s',
          },
        }}
      />
      <div className='trapezoid-1 white pt3 pt0-ns pb5 pb4-ns'>
        <Navbar root={website} />

        <section className='ph5-l'>
          <div className='w-100 tc mt4 pb4 pb5-l'>
            <h1 className='f1 f-subheadline-l ph3'>In-depth, hands-on Kubernetes courses. Online.</h1>
            <p className='tc w-50-l w-70 center f2-l f4 lh-title'>
              Learn the skills to master deployment of applications at scale on Kubernetes.
            </p>
          </div>
        </section>
      </div>

      <section className='pt4'>
        <div className='ma3 ma5-l pa3 mt0-l'>
          <Module
            preview={<img src={resolve('assets/academy/zero-to-k8s-js.svg')} alt='Zero to Kubernetes with Node.js' />}
            title='Zero to Kubernetes with Node.js'
            tag='free course'
          >
            <p className='f4-l lh-copy measure-wide black-80'>
              This course walks you through the full path from coding an application, packaging it into a container and
              deploying it to a production-grade Kubernetes cluster. It forms an optimal basis upon which you can
              explore various scaling topics in more detail.
            </p>
            <p className='f4-l lh-copy measure-wide black-80'>The course covers the following topics:</p>
            <ul className='pl0 list'>
              <ListItem>Writing a note-taking app</ListItem>
              <ListItem>Containerisation with Docker</ListItem>
              <ListItem>Deploying to Kubernetes</ListItem>
              <ListItem>Scaling</ListItem>
              <ListItem>Deploying to cloud</ListItem>
            </ul>
            <p className='f4-l lh-copy measure-wide black-80'>The course includes a certificate of completions.</p>
            <PrimaryButton href={getFullUrl(website.children.zeroToK8s)} text='Learn more &#8594;' />
          </Module>

          <Module
            preview={
              <img
                src={resolve('assets/academy/architecting-scaling.svg')}
                alt='Architecting and scaling apps on Kubernetes'
              />
            }
            title='Architecting and scaling apps on Kubernetes'
          >
            <p className='f4-l lh-copy measure-wide black-80'>
              <span className='b'>A collection of 6 courses</span> designed to lay the foundations of designing and
              deploying applications that scale on Kubernetes. The course is designed to be beginner friendly, and
              progressively introduces more advanced topics.
            </p>
            <p className='f4-l lh-copy measure-wide black-80'>The six courses included in this bundle are:</p>
            <style
              dangerouslySetInnerHTML={{
                __html: `
                .numbered {
                  counter-reset: my-awesome-counter;
                }
                .numbered li {
                  counter-increment: my-awesome-counter;
                }
                .numbered li::before {
                  content: counter(my-awesome-counter);
                  background: #662974;
                  width: 2rem;
                  height: 2rem;
                  border-radius: 50%;
                  display: inline-block;
                  line-height: 2rem;
                  color: white;
                  text-align: center;
                  margin-right: 0.5rem;
                  font-weight: bold;
                  float: left;
                }`,
              }}
            />
            <ul className='pl0 list numbered'>
              <li className='f4-l lh-copy mv2 cf'>
                <p className='pl4 ml2 lh-copy measure mt0'>Linux containers and Kubernetes</p>
              </li>
              <li className='f4-l lh-copy mv2 cf'>
                <p className='pl4 ml2 lh-copy measure mt0'>Kubernetes fundamentals</p>
              </li>
              <li className='f4-l lh-copy mv2 cf'>
                <p className='pl4 ml2 lh-copy measure mt0'>Advanced deployment strategies</p>
              </li>
              <li className='f4-l lh-copy mv2 cf'>
                <p className='pl4 ml2 lh-copy measure mt0'>Managing state</p>
              </li>
              <li className='f4-l lh-copy mv2 cf'>
                <p className='pl4 ml2 lh-copy measure mt0'>Templating</p>
              </li>
              <li className='f4-l lh-copy mv2 cf'>
                <p className='pl4 ml2 lh-copy measure mt0'>Scaling</p>
              </li>
            </ul>
            <p className='f4-l lh-copy measure-wide black-80'>The course includes a certificate of completion.</p>
            <PrimaryButton href={getFullUrl(website.children.architectingAndScaling)} text='Learn more &#8594;' />
          </Module>
        </div>
      </section>

      <Footer root={website} />
    </Layout>,
  )
}

export const Item: React.StatelessComponent<{ tick: JSX.Element }> = ({ children, tick }) => {
  return (
    <li className='mv3 flex justify-center'>
      <div className='v-top tc'>
        <img src={tick.props.src} alt={tick.props.alt} className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>{children}</div>
    </li>
  )
}

const Module: React.StatelessComponent<{
  title: string
  preview: JSX.Element
  className?: string
  tag?: string
}> = ({ children, title, preview, className, tag }) => {
  return (
    <div className={`mh3 ${className}`}>
      <div className='module pt3 pb4 ph4 shadow-2 mv4 bg-white flex items-start mw8 center'>
        <div className='w-50-ns'>
          <h2 className={`f2 navy b ack-20 pb3 ${tag ? 'mb0' : ''}`}>{title}</h2>
          {tag ? <p className='f6 ttu bg-light-green pa2 dib br2 b black-80'>{tag}</p> : null}
          <div className=''>{children}</div>
        </div>
        <div className='w-50 flex-ns flex-wrap items-start pt3 dn'>
          <div className='w-100'>
            <div className='padding-hack-75 relative'>
              <img src={preview.props.src} alt={preview.props.alt} className='absolute top-0 right-0' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Feedback: React.StatelessComponent<{
  description: string
  author: string
  role?: string
  className?: string
}> = ({ description, author, role, className }) => {
  return (
    <div className={`bg-evian ph4 pv3 ${className}`}>
      <p className='f5 lh-copy black-80'>{description}</p>
      <p className='f5 lh-copy black-80 b'>
        — {author}
        {role ? `, ${role}` : ''}
      </p>
    </div>
  )
}

export const ListItemQuestion: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <li className='mv3 flex justify-center'>
      <div className='v-top tc'>
        <img src='assets/question.svg' alt='Question' className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f4-l lh-copy black-70'>{children}</p>
      </div>
    </li>
  )
}

const ListItem: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <li className={`mv2 flex justify-center ${className || ''}`}>
      <div className='v-top tc'>
        <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f4-l lh-copy black-80'>{children}</p>
      </div>
    </li>
  )
}
