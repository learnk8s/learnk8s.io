import React from 'react'
import { Navbar, Html, Head, OpenGraph, Body, Footer, mailto, MailTo } from './layout.v3'
import { join } from 'path'
import { getOpenGraph, getPages, getConfig, State, Actions, Action, StoreV2, ActionV2 } from './store'
import { defaultAssetsPipeline } from './optimise'
import { Store } from 'redux'
import { tachyons } from './tachyons/tachyons'

export const Wallpaper = {
  id: 'wallpaper',
  url: '/kubernetes-wallpapers',
  title: 'Kubernetes wallpapers ⎈ Learnk8s',
  description: 'A collection of free Kubernetes wallpapers for your computer.',
}

const wallpaperRequest: MailTo = {
  subject: 'Learnk8s wallpapers',
  body: `Hi Learnk8s,\n\nI have a suggestion for a wallpaper.\n\n________\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(Wallpaper))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-wallpaper',
      pageId: Wallpaper.id,
      image: <img src='assets/wallpapers/wallpaper-magician.png' alt='Kubernetes wallpapers' />,
      title: 'Kubernetes wallpapers ⎈ Learnk8s',
      description: 'A collection of free Kubernetes wallpapers for your computer.',
    }),
  )
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: Wallpaper.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const pages = getPages(state)
  const page = pages.find(it => it.id === Wallpaper.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === Wallpaper.id)
  const currentAbsoluteUrl = `${state.config.protocol}://${join(state.config.hostname, page.url)}`
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
        <Navbar />

        <section className='ph3 pv4 center'>
          <h1 className='f2 f1-ns navy b tc ph3'>Kubernetes wallpapers</h1>
          <p className='lh-copy f4 black-70 measure center tc ph3'>
            A collection of free Kubernetes wallpapers for your computer.
          </p>

          <ul className='list pl0 mw7 center'>
            <li className='mv4'>
              <div className=''>
                <div className='aspect-ratio aspect-ratio--4x3'>
                  <img
                    src='assets/wallpapers/wallpaper-magician.svg'
                    alt='The magician'
                    className='aspect-ratio--object'
                  />
                </div>
              </div>
              <div className='ph3'>
                <h2 className='f3 lh-solid navy mt0'>The magician</h2>
                <p className='lh-copy f4 black-70 measure'>
                  Originally published with{' '}
                  <a className='link navy i underline' href='https://learnk8s.io/blog/kubectl-productivity'>
                    "Boosting your kubectl productivity"
                  </a>
                  .
                </p>
                <p className='ttu f6 gray b mv4'>Download:</p>
                <ul className='f4'>
                  <li className='mv3'>
                    <a href='assets/wallpapers/magician-3840x2160.png' className='link navy underline-hover' download>
                      4k <span className='gray'>(3840x2160)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/magician-3840x1600.png' className='link navy underline-hover' download>
                      Ultrawide <span className='gray'>(3840x1600)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/magician-2560x1440.png' className='link navy underline-hover' download>
                      Dell Ultrasharp QHD <span className='gray'>(2560x1440)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/magician-1920x1080.png' className='link navy underline-hover' download>
                      Lenovo ThinkPad <span className='gray'>(1920x1080)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a
                      href='assets/wallpapers/magician-1680x1050_2x.png'
                      className='link navy underline-hover'
                      download
                    >
                      MacBook Pro <span className='gray'>(1920x1200 retina)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a
                      href='assets/wallpapers/magician-1680x1050_2x.png'
                      className='link navy underline-hover'
                      download
                    >
                      MacBook Pro <span className='gray'>(1680x1050 retina)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/magician-1440x900_2x.png' className='link navy underline-hover' download>
                      MacBook Pro <span className='gray'>(1440x900 retina)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/magician-1440x900.png' className='link navy underline-hover' download>
                      MacBook Air <span className='gray'>(1440x900)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/magician-1366x768.png' className='link navy underline-hover' download>
                      Microsoft Surface RT <span className='gray'>(1366x768)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/magician-1536x864.png' className='link navy underline-hover' download>
                      Chromebook <span className='gray'>(1536x864)</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className='mv4'>
              <div className=''>
                <div className='aspect-ratio aspect-ratio--4x3'>
                  {React.createElement('img', {
                    src: 'assets/wallpapers/wallpaper-choco.svg',
                    alt: 'Chocolates',
                    loading: 'lazy',
                    className: 'aspect-ratio--object',
                  })}
                </div>
              </div>
              <div className='ph3'>
                <h2 className='f3 lh-solid navy mt0'>Chocolates</h2>
                <p className='lh-copy f4 black-70 measure'>
                  Originally published in the{' '}
                  <a className='link navy i underline' href='https://learnk8s.io/bite-sized'>
                    bite-sized blog post series
                  </a>
                  .
                </p>
                <p className='ttu f6 gray b mv4'>Download:</p>
                <ul className='f4'>
                  <li className='mv3'>
                    <a href='assets/wallpapers/choco-3840x2160.png' className='link navy underline-hover' download>
                      4k <span className='gray'>(3840x2160)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/choco-3840x1600.png' className='link navy underline-hover' download>
                      Ultrawide <span className='gray'>(3840x1600)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/choco-2560x1440.png' className='link navy underline-hover' download>
                      Dell Ultrasharp QHD <span className='gray'>(2560x1440)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/choco-1920x1080.png' className='link navy underline-hover' download>
                      Lenovo ThinkPad <span className='gray'>(1920x1080)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/choco-1680x1050_2x.png' className='link navy underline-hover' download>
                      MacBook Pro <span className='gray'>(1920x1200 retina)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/choco-1680x1050_2x.png' className='link navy underline-hover' download>
                      MacBook Pro <span className='gray'>(1680x1050 retina)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/choco-1440x900_2x.png' className='link navy underline-hover' download>
                      MacBook Pro <span className='gray'>(1440x900 retina)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/choco-1440x900.png' className='link navy underline-hover' download>
                      MacBook Air <span className='gray'>(1440x900)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/choco-1366x768.png' className='link navy underline-hover' download>
                      Microsoft Surface RT <span className='gray'>(1366x768)</span>
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='assets/wallpapers/choco-1536x864.png' className='link navy underline-hover' download>
                      Chromebook <span className='gray'>(1536x864)</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </section>

        <section className='pt1 pb4 bg-evian ph3'>
          <p className='f2 navy b tc mb2 pt3-ns pt3'>
            What about <span className='i underline'>my</span> screen resolution?
          </p>
          <p className='lh-copy f4 black-70 measure center tc'>
            If you want a different wallpaper size, or have an idea for an illustration, drop us a line at{' '}
            <a className='link underline navy' href={mailto(wallpaperRequest)}>
              hello@learnk8s.io
            </a>{' '}
            and will make it happen.
          </p>
        </section>

        <Footer />
      </Body>
    </Html>
  )
}
