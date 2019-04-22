import { getFullUrl, Sitemap } from './sitemap'
import { Image, Img, CSSLink, CSSBundle } from './assets'
import marked from 'marked'
import { h } from './h'

export interface PageDetails {
  title: string
  description: string
  openGraphImage: string
}

export const Assets = {
  logo: Image({ url: 'assets/logo.svg', description: 'Learnk8s' }),
  tick: Image({ url: 'assets/tick.svg', description: 'Tick' }),
  plus: Image({ url: 'assets/plus.svg', description: 'Plus' }),
  smallCargo: Image({ url: 'assets/small_cargo.svg', description: 'Small cargo' }),
  appleTouchIcon: Image({ url: 'assets/apple-touch-icon.png', description: 'Apple touch icon' }),
  favicon16: Image({ url: 'assets/favicon-32x32.png', description: 'Favicon' }),
  favicon32: Image({ url: 'assets/favicon-16x16.png', description: 'Favicon' }),
  safariPinnedTab: Image({ url: 'assets/safari-pinned-tab.svg', description: 'Safari Pinned Tab' }),
  android192: Image({ url: 'assets/android-chrome-192x192.png', description: 'Android Chrome' }),
  android384: Image({ url: 'assets/android-chrome-384x384.png', description: 'Android Chrome' }),
  mstyle: Image({ url: 'assets/mstile-150x150.png', description: 'MS Style' }),
}

export const Layout: React.StatelessComponent<{
  website: Sitemap
  seoTitle: string
  title: string
  description: string
  openGraphImage: Image
  absoluteUrl: string
  cssBundle: CSSBundle
}> = ({ children, website, seoTitle, title, description, openGraphImage, absoluteUrl, cssBundle }) => {
  const gaId = 'GTM-5WCKPRL'
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <title>{seoTitle}</title>
        <meta name='description' content={description} />
        <meta name='author' content='Learnk8s' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@learnk8s' />
        <link rel='apple-touch-icon' sizes='180x180' href={Assets.appleTouchIcon.url} />
        <link rel='icon' type='image/png' sizes='32x32' href={Assets.favicon32.url} />
        <link rel='icon' type='image/png' sizes='16x16' href={Assets.favicon16.url} />
        <link rel='manifest' href={getFullUrl(website.children.webAppManifest)} />
        <link rel='mask-icon' href={Assets.safariPinnedTab.url} color='#326ce5' />
        <link
          rel='alternate'
          type='application/rss+xml'
          title='Subscribe to Learnk8s RSS'
          href={getFullUrl(website.children.rss)}
        />
        <meta name='theme-color' content='#ffffff' />
        <meta property='og:site_name' content='Learnk8s' />
        <meta property='og:url' content={absoluteUrl} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:image' content={openGraphImage.url} />
        <meta property='og:description' content={description} />
        <meta name='pocket-site-verification' content='1476398dfb5a771a94da9466e0bb43' />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function (w, d, s, l, i) {
w[l] = w[l] || []; w[l].push({
  'gtm.start':
    new Date().getTime(), event: 'gtm.js'
}); var f = d.getElementsByTagName(s)[0],
  j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', '${gaId}');`,
          }}
        />
        <CSSLink css={cssBundle} />
      </head>
      <body className='bg-near-white sans-serif'>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gaId}`}
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <div className='cf w-100 mw9-l center bg-white'>{children}</div>
      </body>
    </html>
  )
}

export const Navbar: React.StatelessComponent<{ root: Sitemap }> = ({ root }) => {
  return (
    <nav className='nav cf bb-ns b--lightest-blue-ns pl3 ph0-m ph3l flex-ns items-center-ns bg-sky'>
      <a href={getFullUrl(root)} className='logo fl-ns w-100 mw4 mw-none-ns dib w-20-m w-10-l pa2-ns'>
        <Img image={Assets.logo} />
      </a>
      <ul className='list fl w-80-m w-90-l pa2 tr dn db-ns'>
        <li className='dib ttu'>
          <a href={getFullUrl(root.children.academy)} className='link white mh3 dib f6 ribbon' title='Academy'>
            Academy
          </a>
        </li>
        <li className='dib ttu'>
          <a href={getFullUrl(root.children.training)} className='link white mh3 dib f6' title='Training'>
            Training
          </a>
        </li>
        <li className='dn dib-l ttu'>
          <a href={getFullUrl(root.children.blog)} className='link white mh3 dib f6' title='Blog'>
            Blog
          </a>
        </li>
        <li className='dn dib-l ttu'>
          <a href={getFullUrl(root.children.contactUs)} className='link white mh3 dib f6' title='Contact us'>
            Contact us
          </a>
        </li>
      </ul>
    </nav>
  )
}

export const Footer: React.StatelessComponent<{ root: Sitemap }> = ({ root }) => {
  return (
    <footer className='footer white ph3 ph4-ns pt4 pt5-ns pb3 bg-sky'>
      <section className='flex-ns items-start-ns justify-around-ns pr3-m pr7-l'>
        <div className='dn db-l'>
          <a href={getFullUrl(root)} className='logo w4 db'>
            <Img image={Assets.logo} />
          </a>
          <p>Learn Kubernetes the smart way</p>
        </div>
        <div className='dn db-ns'>
          <h2 className='ttu f6'>Services</h2>
          <ul className='list pl0'>
            <li className='mv2'>
              <a href={getFullUrl(root.children.training)} className='link white'>
                Training
              </a>
            </li>
            <li className='mv2'>
              <a href={getFullUrl(root.children.academy)} className='link white'>
                Academy
              </a>
            </li>
            <li className='mv2'>
              <a href={getFullUrl(root.children.consulting)} className='link white'>
                Consulting
              </a>
            </li>
          </ul>
        </div>
        <div className=''>
          <h2 className='ttu f6'>Company</h2>
          <ul className='list pl0'>
            <li className='mv2'>
              <a href={getFullUrl(root.children.contactUs)} className='link white'>
                Contact us
              </a>
            </li>
            <li className='mv2'>
              <a href={getFullUrl(root.children.aboutUs)} className='link white'>
                Team
              </a>
            </li>
            <li className='mv2'>
              <a href={getFullUrl(root.children.careers)} className='link white'>
                Careers
              </a>
            </li>
            <li className='mv2'>
              <a href={getFullUrl(root.children.blog)} className='link white'>
                Blog
              </a>
            </li>
            <li className='mv2'>
              <a href={getFullUrl(root.children.newsletter)} className='link white'>
                Newsletter
              </a>
            </li>
          </ul>
        </div>
        <div className='pt3 pt0-ns'>
          <h2 className='ttu f6'>Follow us</h2>
          <ul className='list pl0'>
            <li className='dib'>
              <a href='https://github.com/learnk8s' className='link dib w2 h2 icon' title='Learnk8s on GitHub'>
                <GithubLogo />
              </a>
            </li>
            <li className='dib'>
              <a href='https://twitter.com/learnk8s' className='link dib w2 h2 icon' title='Learnk8s on Twitter'>
                <TwitterLogo />
              </a>
            </li>
            <li className='dib'>
              <a href='skype:daniele.polencic?chat' className='link dib w2 h2 icon' title='Learnk8s on Skype'>
                <SkypeLogo />
              </a>
            </li>
            <li className='dib'>
              <a
                href='https://www.linkedin.com/company/learnk8s/'
                className='link dib w2 h2 icon'
                title='Learnk8s on LinkedIn'
              >
                <LinkedInLogo />
              </a>
            </li>
            <li className='dib'>
              <a
                href='https://learnk8s-slack-invite.herokuapp.com'
                className='link dib w2 h2 icon'
                title='Learnk8s on Slack'
              >
                <SlackLogo />
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className='pt2 pt5-ns'>
        <p className='f7 bt b--light-blue pv2 white-70'>
          Copyright &copy; learnk8s 2017-2019. Made with ❤︎ in London. View our{' '}
          <a className='link white-70' href={getFullUrl(root.children.termsAndConditions)}>
            Terms and Conditions
          </a>{' '}
          or Privacy Policy. Send us a note to{' '}
          <a href='mailto:hello@learnk8s.io' className='link white underline'>
            hello@learnk8s.io
          </a>
        </p>
      </section>
    </footer>
  )
}

export const GithubLogo: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'>
      <path
        fill='#ffffff'
        d='M30 6C16.8 6 6 17 6 30.6 6 41.5 12.9 50.7 22.4 54c1.2.2 1.6-.5 1.6-1.2v-4.2c-6.7 1.5-8.1-3.3-8.1-3.3-1.1-2.8-2.7-3.6-2.7-3.6-2.2-1.5.2-1.5.2-1.5 2.4.2 3.7 2.5 3.7 2.5 2.1 3.8 5.6 2.7 7 2 .2-1.6.8-2.7 1.5-3.3-5.3-.6-10.9-2.7-10.9-12.2 0-2.7.9-4.9 2.5-6.6-.2-.6-1.1-3.1.2-6.5 0 0 2-.7 6.6 2.5 1.9-.5 4-.8 6-.8s4.1.3 6 .8c4.6-3.2 6.6-2.5 6.6-2.5 1.3 3.4.5 5.9.2 6.5 1.5 1.7 2.5 3.9 2.5 6.6 0 9.5-5.6 11.5-11 12.1.9.8 1.6 2.3 1.6 4.6v6.8c0 .7.4 1.4 1.7 1.2C47.2 50.7 54 41.5 54 30.6 54 17 43.3 6 30 6z'
      />
    </svg>
  )
}

export const TwitterLogo: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'>
      <path
        fill='#ffffff'
        d='M50.2 12.7c-1.7 1-3.5 1.8-5.5 2.2-1.6-1.8-3.8-2.9-6.3-2.9-4.8 0-8.6 4.1-8.6 9.1 0 .7.1 1.4.2 2.1-7.2-.4-13.5-4-17.8-9.5-.7 1.3-1.2 2.9-1.2 4.6 0 3.2 1.5 5.9 3.8 7.6-1.4 0-2.7-.5-3.9-1.1v.1c0 4.4 3 8.1 6.9 8.9-.7.2-1.5.3-2.3.3-.6 0-1.1-.1-1.6-.2 1.1 3.6 4.3 6.2 8 6.3-3 2.4-6.7 3.9-10.7 3.9-.7 0-1.4 0-2.1-.1 3.8 2.6 8.3 4.1 13.2 4.1C38.4 48 47 34.2 47 22.1v-1.2c1.7-1.3 3.1-2.9 4.3-4.7-1.5.7-3.2 1.2-4.9 1.4 1.7-1 3.1-2.8 3.8-4.9z'
      />
    </svg>
  )
}

export const SkypeLogo: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'>
      <path
        fill='#ffffff'
        d='M53.1 30.3c0-12.5-10.2-22.6-22.9-22.6-1.3 0-2.6.1-3.9.3-2-1.3-4.5-2-7.1-2C11.9 6 6 11.9 6 19.1c0 2.4.7 4.7 1.8 6.6-.3 1.5-.5 3-.5 4.5 0 12.5 10.2 22.6 22.9 22.6 1.4 0 2.8-.1 4.2-.4 1.9 1 4 1.6 6.3 1.6C48.1 54 54 48.1 54 40.9c0-2.1-.5-4.1-1.4-5.8.4-1.6.5-3.2.5-4.8zM41.8 41c-1.1 1.5-2.6 2.6-4.7 3.5-2 .8-4.4 1.2-7.2 1.2-3.3 0-6-.6-8.2-1.7-1.5-.8-2.8-1.9-3.8-3.3s-1.5-2.8-1.5-4.1c0-.8.3-1.5 1-2.1.6-.6 1.4-.9 2.4-.9.8 0 1.5.2 2 .7.5.4 1 1.1 1.3 1.9.4.9.8 1.7 1.3 2.3.4.6 1.1 1.1 1.9 1.5s2 .6 3.3.6c1.9 0 3.4-.4 4.6-1.2 1.1-.8 1.7-1.7 1.7-2.8 0-.9-.3-1.6-.9-2.1-.6-.6-1.4-1-2.4-1.3s-2.5-.7-4.2-1c-2.4-.5-4.4-1.1-6-1.8-1.6-.7-3-1.6-3.9-2.8-1-1.2-1.5-2.7-1.5-4.5 0-1.7.5-3.2 1.6-4.6 1-1.3 2.5-2.3 4.4-3 1.9-.7 4.2-1 6.7-1 2 0 3.8.2 5.3.7s2.8 1.1 3.8 1.9c1 .8 1.8 1.6 2.2 2.5.5.9.7 1.7.7 2.6 0 .8-.3 1.5-.9 2.2-.6.6-1.4 1-2.4 1-.8 0-1.5-.2-2-.6-.4-.4-.9-1-1.4-1.8-.6-1.1-1.3-1.9-2.1-2.5s-2.1-.9-3.8-.9c-1.6 0-3 .3-4 1-1 .6-1.4 1.3-1.4 2.2 0 .5.1.9.5 1.3.3.4.8.7 1.4 1s1.2.5 1.8.7c.6.2 1.7.4 3.2.8 1.9.4 3.6.8 5.1 1.3s2.8 1.1 3.9 1.8 2 1.6 2.6 2.7.9 2.4.9 4c.3 1.4-.2 3.1-1.3 4.6z'
      />
    </svg>
  )
}

export const LinkedInLogo: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'>
      <path
        fill='#ffffff'
        d='M14.8 10c-2.9 0-4.8 2-4.8 4.7 0 2.6 1.8 4.7 4.7 4.7h.1c2.9 0 4.8-2.1 4.8-4.7-.2-2.7-2-4.7-4.8-4.7zM11 22.8h7.8V50H11zM40.1 22.6c-4.5 0-7.3 2.7-7.8 4.5v-4.3h-8.8c.1 2.3 0 27.2 0 27.2h8.8V35.3c0-.8 0-1.6.2-2.2.6-1.6 1.9-3.3 4.2-3.3 3 0 4.4 2.5 4.4 6.2v14H50V34.9c0-8.4-4.4-12.3-9.9-12.3z'
      />
    </svg>
  )
}

export const SlackLogo: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'>
      <path fill='#ffffff' d='M25.913 27.84l5.88-1.968 1.904 5.69-5.88 1.968z' />
      <path
        fill='#ffffff'
        d='M24 9.8C8.8 14.4 5.3 20.9 9.8 36 14.4 51.2 20.9 54.7 36 50.2 51.2 45.6 54.7 39.1 50.2 24 45.6 8.8 39.1 5.3 24 9.8zm18.5 24l-2.9 1 1 3c.4 1.2-.2 2.5-1.4 2.9-.3.1-.5.1-.8.1-.9 0-1.8-.6-2.1-1.6l-1-2.9-5.9 2 1 2.9c.4 1.2-.2 2.5-1.4 2.9-.3.1-.5.1-.8.1-.9 0-1.8-.6-2.1-1.6l-1-3-2.9 1c-.3.1-.5.1-.8.1-.9 0-1.8-.6-2.1-1.6-.4-1.2.2-2.5 1.4-2.9l2.9-1-1.9-5.7-2.9 1c-.3.1-.5.1-.8.1-.9 0-1.8-.6-2.1-1.6-.4-1.2.2-2.5 1.4-2.9l2.9-1-1-2.9c-.4-1.2.2-2.5 1.4-2.9 1.2-.4 2.5.2 2.9 1.4l1 2.9 5.9-2-1-2.9c-.4-1.2.2-2.5 1.4-2.9 1.2-.4 2.5.2 2.9 1.4l1 3 2.9-1c1.2-.4 2.5.2 2.9 1.4.4 1.2-.2 2.5-1.4 2.9l-2.9 1 1.9 5.7 2.9-1c1.2-.4 2.5.2 2.9 1.4.5 1.5-.2 2.8-1.4 3.2z'
      />
    </svg>
  )
}

export const Consultation: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <section className='trapezoidr-1 white flex-l items-end-l justify-around-l bb b--lightest-blue pb3-l'>
      <div className='pt4 pt5-ns ph3'>
        <h3 className='normal mb1'>Are you looking for something else?</h3>
        <h2 className='f2 mt0'>Book a free 15m consultation</h2>
      </div>
      <div className='ph3 pb4'>
        <a href='https://calendly.com/learnk8s/15min' className='link dib blue bg-white br1 pa3 b f5 shadow-3 ph4'>
          Book now &#8594;
        </a>
      </div>
    </section>
  )
}

export const ListItem: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <li className={`mv3 flex justify-center ${className || ''}`}>
      <div className='v-top tc'>
        <Img image={Assets.tick} className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f4-l lh-copy'>{children}</p>
      </div>
    </li>
  )
}

export const SpecialListItem: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <li className='mv3 flex justify-center'>
      <div className='v-top tc'>
        <Img image={Assets.plus} className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f4-l lh-copy'>{children}</p>
      </div>
    </li>
  )
}

export const Interlude: React.StatelessComponent<{}> = ({}) => {
  return (
    <section className='triangle-1 tr'>
      <div className='dib mr4'>
        <div className='i-small-cargo relative'>
          <Img image={Assets.smallCargo} className='absolute top-0 right-0' />
        </div>
      </div>
    </section>
  )
}

const inlineRenderer = new marked.Renderer()

inlineRenderer.paragraph = text => {
  return text
}
inlineRenderer.link = (href: string, title: string, text: string) => {
  return `<a href="${href}" className="link underline navy">${text}</a>`
}
inlineRenderer.list = (body: string, ordered: boolean) => {
  const element = ordered ? 'ol' : 'ul'
  return `<${element}>${body}</${element}>`
}
inlineRenderer.listitem = (text: string) => {
  return `<li class="lh-copy black-70">${text}</li>`
}

export const InlineMarkdown: React.StatelessComponent<{ content: string }> = ({ content }) => {
  return <span dangerouslySetInnerHTML={{ __html: marked(content, { renderer: inlineRenderer }) }} />
}

export const Testimonal: React.StatelessComponent<{ quote: string; author: string }> = ({ quote, author }) => {
  return (
    <section className='trapezoidr-1 white lh-copy'>
      <div className='pt5-m pt5 pb4 ph3 measure-wide center'>
        <p className='f3 mb1 mt0 lh-copy'>&ldquo;{quote}&rdquo;</p>
        <p className='f4 i mb2'>— {author}</p>
      </div>
    </section>
  )
}

export interface MailTo {
  subject: string
  body: string
  email: string
}

export function mailto({ subject, body, email }: MailTo) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const YourTeam: React.StatelessComponent<{ mailto: string }> = ({ mailto }) => {
  return (
    <section className='trapezoidr-1 white flex-l items-end-l justify-around-l'>
      <div className='pt5-m pt4 pb4 ph3'>
        <h2 className='f2 mb2'>Need to train your team?</h2>
        <h3 className='normal mb1 measure-wide mt0 lh-copy'>
          We offer flexible, cost-effective group membership for businesses, schools or government organisations.
        </h3>
      </div>
      <div className='ph3 pb4'>
        <a href={mailto} className='link dib blue bg-white br1 pa3 b f5 shadow-3 ph4'>
          Get in touch &#8594;
        </a>
      </div>
    </section>
  )
}

export interface FAQ {
  title: string
  content: string
}

export const FAQs: React.StatelessComponent<{ faqs: FAQ[] }> = ({ faqs }) => {
  return (
    <section className='ph3 measure-wide pv4 center'>
      <h3 className='f3 f2-l navy pb3'>Frequently asked questions</h3>
      <ul className='list pl0'>
        {faqs.map((it, index) => {
          return (
            <li key={index}>
              <h4 className='navy f4 f3-l mb2'>{it.title}</h4>
              <p className='lh-copy black-70'>
                <InlineMarkdown content={it.content} />
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export const PackageLeft: React.StatelessComponent<{ heading: string; subheading: string }> = ({
  children,
  heading,
  subheading,
}) => {
  return (
    <li className='fl-ns w-50-ns'>
      <div className={`mv3 mh3 ml4-ns mr2-ns bg-black-02`}>
        <div className='header ph3 pt1 bb b--light-gray'>
          <h2 className='navy tc mb1'>{heading}</h2>
          <h3 className='normal black-70 tc mt0'>{subheading}</h3>
        </div>
        {children}
      </div>
    </li>
  )
}

export const PackageRight: React.StatelessComponent<{ heading: string; subheading: string }> = ({
  children,
  heading,
  subheading,
}) => {
  return (
    <li className='fl-ns w-50-ns mt5-ns'>
      <div className={`mv3 mh3 ml2-ns mr4-ns bg-evian`}>
        <div className='header ph3 pt1 bb b--light-gray'>
          <h2 className='navy tc mb1'>{heading}</h2>
          <h3 className='normal black-70 tc mt0'>{subheading}</h3>
        </div>
        {children}
      </div>
    </li>
  )
}

export const PackageList: React.StatelessComponent<{}> = ({ children }) => {
  return <ul className='cf list'>{children}</ul>
}

export const Hero: React.StatelessComponent<{ image: Image; imageClass: string }> = ({
  children,
  image,
  imageClass,
}) => {
  return (
    <section className='flex-ns items-center justify-center overflow-hidden center'>
      <div className='mw7 ph4'>{children}</div>
      <div className='dn db-l mw6'>
        <div className={`${imageClass} relative`}>
          <Img image={image} className='absolute top-0 right-0' />
        </div>
      </div>
    </section>
  )
}

export const PromoAcademy: React.StatelessComponent<{ sitemap: Sitemap }> = ({ sitemap }) => {
  return (
    <div>
      <div className='ph4 ph5-l pv4 bg-evian br2 mt5'>
        <h2 className='f2 pt0 pb2 mt2 navy'>Become an expert at deploying and scaling applications in Kubernetes</h2>
        <p className='lh-copy measure-wide f4'>
          Learn how to tame Kubernetes and deploy applications at scale with an hands-on, self-paced course designed for
          visual learners.
        </p>
        <p className='lh-copy measure-wide f4'>
          The Learnk8s Academy is an excellent resource if you wish to learn how to:
        </p>
        <ul className='list ph3'>
          <ListItem>
            <span className='b'>Master Kubernetes networking</span> and handle the busiest traffic websites without
            breaking a sweat
          </ListItem>
          <ListItem>
            <span className='b'>Scale your jobs to thousands of servers</span> and reduce the waiting time from days to
            minutes
          </ListItem>
          <ListItem>
            Design reliable clusters and enjoy peace of mind knowing that{' '}
            <span className='b'>your apps are highly available in a multi-cloud setup</span>
          </ListItem>
          <ListItem>
            <span className='b'>Optimise server density with containers</span> and Kubernetes and save a ton of cash on
            your cloud bill by using only the resources you need
          </ListItem>
          <ListItem>
            Supercharge your delivery pipeline and <span className='b'>deploy application around the clock</span>
          </ListItem>
        </ul>
        <div className='pt2 pb4'>
          <a
            href={getFullUrl(sitemap.children.academy)}
            className='link dib white bg-blue br1 pa3 b f5 shadow-3 mv3 mr3'
          >
            Learn more →
          </a>
        </div>
      </div>
      <p className='lh-copy f5 mt4'>
        P.S. Don't miss the next experiment, insight, or <span className='b'>discount</span>:{' '}
        <a href={getFullUrl(sitemap.children.newsletter)} className='link navy underline hover-sky'>
          subscribe to the mailing list!
        </a>
      </p>
    </div>
  )
}

export const Subscribe: React.StatelessComponent<{ identifier: string }> = ({ identifier }) => {
  return (
    <div className='bg-evian pa4 br2 mv4 mv5-l'>
      <p className='f2 navy b mt0 measure-narrow'>Don't miss the next experiment, insight, or discount</p>
      <p className='f4 measure black-80 mv4 lh-copy'>
        Sign up for curated Kubernetes news, article and resources, delivered straight to your inbox.
      </p>
      <form action='https://learnk8s.us19.list-manage.com/subscribe/post' method='POST'>
        <input type='hidden' name='u' value='2f82ec7d5caaa9ced71141211' />
        <input type='hidden' name='id' value='8ecff1a8cf' />
        {/* <Honeypot> */}
        <div className='dn' aria-label='Please leave the following three fields empty'>
          <label htmlFor='b_name'>Name: </label>
          <input type='text' name='b_name' tabIndex={-1} defaultValue='' placeholder='Freddie' id='b_comment' />

          <label htmlFor='b_email'>Email: </label>
          <input
            type='email'
            name='b_email'
            tabIndex={-1}
            defaultValue=''
            placeholder='youremail@gmail.com'
            id='b_comment'
          />

          <label htmlFor='b_comment'>Comment: </label>
          <textarea name='b_comment' tabIndex={-1} placeholder='Please comment' id='b_comment' />
        </div>
        {/* </Honeypot> */}

        <div className='mv4'>
          <div className='mv3'>
            <label htmlFor='MERGE1' className='navy db tl ttu pb2 fw6'>
              Your first name
            </label>
            <div className='field-group'>
              <input
                className='pa3 w-100 br3 input-reset b--none'
                type='text'
                name='MERGE1'
                id='MERGE1'
                size={25}
                defaultValue=''
                placeholder='Your first name'
              />
            </div>
          </div>

          <div className='mv3'>
            <label htmlFor='MERGE0' className='navy db tl ttu pb2 fw6'>
              Your email address
            </label>
            <div className='field-group'>
              <input
                className='pa3 w-100 br3 input-reset b--none'
                type='email'
                autoCapitalize='off'
                autoCorrect='off'
                name='MERGE0'
                id='MERGE0'
                size={25}
                defaultValue=''
                placeholder='Your email address'
              />
            </div>
          </div>
        </div>

        <div className=''>
          <button className='dib white bg-blue br1 pv3 ph4 b f4 bn pointer' type='submit'>
            Subscribe ⇢
          </button>
        </div>
        <input type='hidden' name='MERGE2' id='MERGE2' value={identifier} />
        <input type='hidden' name='ht' value='aca6953f09c7fcc43d98b4366d71b6e0c79fbb81:MTU1NDE3Njc3OC40MzAz' />
        <input type='hidden' name='mc_signupsource' value='hosted' />
      </form>
      <p className='f6 black-60 mt4 mb0'>We'll never share your email address and you can opt out at any time.</p>
    </div>
  )
}
