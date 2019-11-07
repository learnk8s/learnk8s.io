import React from 'react'
import { LinkedNode, Sitemap, getAbsoluteUrl } from './sitemap'
import { Consultation, Footer, Layout } from './layout.v2'
import { renderToStaticMarkup } from 'react-dom/server'
import { Navbar } from './layout.v3'

export const Details = {
  type: 'contactUs',
  url: '/contact-us',
  seoTitle: 'Contact us ♦︎ Learnk8s',
  title: 'Contact us',
  description: 'Feel free to get in touch and let us know how we can help. ',
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
      <div className='trapezoid-1 white pt3 pt0-ns pb2 pb4-ns'>
        <Navbar />

        <section className='ph5-l'>
          <div className='w-100'>
            <h1 className='f1 pl3 pl4-ns f-subheadline-l'>Contact us</h1>
            <h2 className='f4 normal measure-narrow lh-copy ph3 ph4-ns f3-l'>
              Get in touch and let us know how we can help.
            </h2>
          </div>
          <ul className='list pl0 flex-l items-start-l justify-around-l ph3'>
            <Block
              image={<img src='assets/contact-us/line_chart.svg' alt='Line chart' />}
              title={`Sales`}
              description={`We'd love to talk about how we can work together.`}
            >
              <a href='mailto:sales@learnk8s.io' className='link navy b'>
                Contact sales →
              </a>
            </Block>
            <Block
              image={<img src='assets/contact-us/sales.svg' alt='Man on the phone' />}
              title={`Help & support`}
              description={`We're here to help with any question.`}
            >
              <a href='mailto:support@learnk8s.io' className='link navy b'>
                Contact support →
              </a>
            </Block>
            <Block
              image={<img src='assets/contact-us/square_logo.svg' alt='Learnk8s logo' />}
              title={`Media & press`}
              description={`Get learnk8s news, company info, and media resources.`}
            >
              <a href='assets/contact-us/media.zip' className='link navy b'>
                Download →
              </a>
            </Block>
          </ul>
        </section>
      </div>

      <section className='w-100 cf pv3 pv4-m pv5-l ph3'>
        <div className='left fl-ns w-50-ns tc mv4 ph3'>
          <h2 className='navy'>
            Join us on Slack{' '}
            <span className='w2 dib v-mid'>
              <img src='assets/contact-us/slack_in_colours.svg' alt='Slack logo' />
            </span>
          </h2>
          <p className='measure black-70 center'>
            If you have technical questions, chat live with developers in #dev.{' '}
            <a href='https://learnk8s-slack-invite.herokuapp.com' className='link underline navy'>
              Join now
            </a>
          </p>
        </div>
        <div className='right fl-ns w-50-ns tc bl-ns b--light-gray mv4 ph3'>
          <h2 className='navy'>General communication</h2>
          <p className='measure black-70 center'>
            For general queries, including partnership opportunities, please email{' '}
            <a href='mailto:hello@learnk8s.io' className='link navy underline'>
              hello@learnk8s.io
            </a>
            .
          </p>
        </div>
      </section>

      <Consultation />
      <Footer root={website} />
    </Layout>,
  )
}

export const Block: React.StatelessComponent<{ image: JSX.Element; title: string; description: string }> = ({
  title,
  description,
  children,
  image,
}) => {
  return (
    <li className='bg-white br2 relative pt4 w-100 mw6-m center-m w-30-l mv5'>
      <div className='w3 h3 bg-white br-100 shadow-1 absolute top--2 left-0 absolute-center'>{image}</div>
      <h2 className='navy normal tc'>{title}</h2>
      <p className='lh-copy black-70 ph4 measure-narrow'>{description}</p>
      <div className='tc bg-evian br2 br--bottom pv3'>{children}</div>
    </li>
  )
}
