import React from 'react'
import { Navbar, Html, Head, OpenGraph, Body, Footer } from './layout.v3'
import { Action, State, Actions, getConfig, getPages, getOpenGraph, StoreV2, ActionV2 } from './store'
import { Store } from 'redux'
import { defaultAssetsPipeline } from './optimise'
import { join } from 'path'
import { tachyons } from './tachyons/tachyons'

export const Newsletter = {
  id: 'newsletter',
  url: '/newsletter',
  title: 'Newsletter ⎈ Learnk8s',
  description: 'Keep yourself up to date with the latest news from Learnk8s.',
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(Newsletter))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-newsletter',
      pageId: Newsletter.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      title: 'Newsletter',
      description: 'Keep yourself up to date with the latest news from Learnk8s.',
    }),
  )
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: Newsletter.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const page = getPages(state).find(it => it.id === Newsletter.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === Newsletter.id)
  const currentAbsoluteUrl = `${getConfig(state).protocol}://${join(getConfig(state).hostname, page.url)}`
  return (
    <Html>
      <Head title={page.title} description={page.description}>
        {openGraph ? (
          <OpenGraph
            title={openGraph.title}
            description={openGraph.description}
            image={openGraph.image}
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
            <div className='w-100 tc mt4'>
              <h1 className='f1 f-subheadline-l'>The Learnk8s Newsletter</h1>
              <p className='tc w-50-l w-70 center f2-l f4 lh-title'>
                Sign up for curated Kubernetes news, article and resources, delivered straight to your inbox
                occasionaly.
              </p>
            </div>
            <div id='subscription-form' className='w-40-l w-60 tc center mb5 mt5 mt0-l'>
              <form action='https://learnk8s.us19.list-manage.com/subscribe/post' method='POST' className='relative'>
                <ol className='list pl0'>
                  <li>
                    <input type='hidden' name='u' defaultValue='2f82ec7d5caaa9ced71141211' />
                  </li>
                  <li>
                    <input type='hidden' name='id' defaultValue='8ecff1a8cf' />
                  </li>
                  <li>
                    <label htmlFor='MERGE1' className='db tl ttu pb2 b'>
                      Your first name
                    </label>
                    <input
                      className='pa3 w-100 br3 input-reset b--none'
                      type='text'
                      name='MERGE1'
                      id='MERGE1'
                      placeholder='Your first name'
                    />
                  </li>
                  <li className='mt4'>
                    <label htmlFor='MERGE0' className='db tl ttu pb2 b'>
                      Your email address
                    </label>
                    <input
                      className='pa3 w-100 br3 input-reset b--none'
                      type='email'
                      required={true}
                      name='MERGE0'
                      id='MERGE0'
                      placeholder='Your email address'
                    />
                    <p className='f7 tl'>We'll never share your email address and you can opt out at any time.</p>
                  </li>
                </ol>
                <button className='dib blue bg-white br2 pa3 b f3-ns mt2 ml3-l ph5 mb3 b--none submit' type='submit'>
                  Subscribe ⇢
                </button>
                <p className='success absolute bottom mt1 w-100 bg-light-green pa2 dark-green b--dark-green bw1 b--solid dn'>
                  Thank you for subscribing!
                </p>
                <p className='failure absolute bottom mt1 w-100 bg-light-red pa2 black b--dark-red bw1 b--solid dn'>
                  Invalid email.
                </p>
              </form>
              <script dangerouslySetInnerHTML={{ __html: `(${SubmitWithAjax.toString()})()` }} className='dn' />
            </div>
          </section>
        </div>

        <hr className='pa3 bn' />

        <Footer />
      </Body>
    </Html>
  )
}

function SubmitWithAjax() {
  var form = document.querySelector('form')
  var success = document.querySelector('.success')
  var failure = document.querySelector('.failure')
  if (!form || !success || !failure) {
    return
  }
  form.addEventListener('submit', function(event) {
    success!.classList.add('dn')
    failure!.classList.add('dn')
    const emailElement = form!.querySelector('#MERGE0') as HTMLInputElement
    const firstnameElement = form!.querySelector('#MERGE1') as HTMLInputElement
    const user = form!.querySelector('[name=u]') as HTMLInputElement
    const id = form!.querySelector('[name=id]') as HTMLInputElement
    if (!emailElement || !firstnameElement || !user || !id) {
      return
    }
    event.preventDefault()
    var email = (emailElement.value + '').trim()
    if (email === '' || !/\w+@\w+\.\w{2,10}/gi.test(email)) {
      return failure!.classList.remove('dn')
    }
    var firstname = (firstnameElement.value + '').trim()
    var url = form!.getAttribute('action')
    var args = [
      'id=' + encodeURIComponent(id.value),
      'u=' + encodeURIComponent(user.value),
      'EMAIL=' + encodeURIComponent(email),
      'FNAME=' + encodeURIComponent(firstname),
    ]
    submit(`${url}-json?${args.join('&')}`)
    success!.classList.remove('dn')
  })
  function submit(url: string) {
    var request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.send()
  }
}
