import React from 'react'
import { Navbar, Html, Head, OpenGraph, Body, Footer, Consultation } from './layout.v3'
import { State, Action, getConfig, Store, Selector } from './store'
import { join } from 'path'
import { defaultAssetsPipeline } from './optimise'
import { tachyons } from './tachyons/tachyons'

export const ContactUs = {
  id: 'contactUs',
  url: '/contact-us',
  title: 'Contact us ⎈ Learnk8s',
  description: 'Feel free to get in touch and let us know how we can help. ',
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(ContactUs))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-contact-us',
      pageId: ContactUs.id,
      imagePath: 'assets/open_graph_preview.png',
      title: 'Contact us',
      description: 'Feel free to get in touch and let us know how we can help. ',
    }),
  )
}

export function Mount({ store }: { store: Store }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: ContactUs.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const page = Selector.pages.selectAll(state).find(it => it.id === ContactUs.id)!
  const openGraph = Selector.openGraphs.selectAll(state).find(it => it.pageId === ContactUs.id)
  const currentAbsoluteUrl = `${getConfig(state).protocol}://${join(getConfig(state).hostname, page.url)}`
  return (
    <Html>
      <Head title={page.title} description={page.description}>
        {openGraph ? (
          <OpenGraph
            title={openGraph.title}
            description={openGraph.description}
            image={openGraph.imagePath}
            currentAbsoluteUrl={currentAbsoluteUrl}
          />
        ) : null}
        <style>{tachyons}</style>
        <link rel='stylesheet' href='assets/style.css' />
        <link rel='canonical' href={currentAbsoluteUrl} />
      </Head>
      <Body>
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
              Technical support for students{' '}
              <span className='w2 dib v-mid'>
                <img src='assets/contact-us/slack_in_colours.svg' alt='Slack logo' />
              </span>
            </h2>
            <p className='f4 measure-narrow black-70 center lh-copy'>
              If you have technical questions, chat live with the Learnk8s instructors in the{' '}
              <span className='navy'>#academy</span> channel.{' '}
              <a href='https://learnk8s-slack-invite.herokuapp.com' className='link underline navy'>
                Join Learnk8s on Slack
              </a>
              .
            </p>
          </div>
          <div className='right fl-ns w-50-ns tc bl-ns b--light-gray mv4 ph3'>
            <h2 className='navy'>
              Be part of the community{' '}
              <span className='w2 dib v-mid'>
                <img src='assets/contact-us/telegram.svg' alt='Telegram logo' />
              </span>
            </h2>
            <p className='f4 measure-narrow black-70 center lh-copy'>
              If you want to discuss the latest changes and share your victories with Kubernetes{' '}
              <a href='https://t.me/learnk8s' className='link underline navy'>
                join now the Learnk8s telegram group
              </a>
              .
            </p>
          </div>
        </section>

        <section className='pt1 pb4 bg-evian ph3'>
          <p className='f2 navy b tc mb2 pt3-ns pt3'>For any other inquiry</p>
          <p className='lh-copy f4 black-70 measure center tc'>
            For general queries, including partnership opportunities, please send email to{' '}
            <a href='mailto:hello@learnk8s.io' className='link navy underline'>
              hello@learnk8s.io
            </a>
            .
          </p>
        </section>

        <Footer />
      </Body>
    </Html>
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
