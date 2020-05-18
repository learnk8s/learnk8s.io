import React, { Fragment } from 'react'
import { transform } from './markdown/utils'
import { toMdast } from './markdown'
import { toVFile } from './files'
import { mdast2Jsx } from './markdown/jsx'

export const OpenGraph: React.StatelessComponent<{
  currentAbsoluteUrl: string
  title: string
  image: JSX.Element
  description: string
}> = ({ children, currentAbsoluteUrl, title, image, description }) => {
  return (
    <Fragment>
      <meta property='og:url' content={currentAbsoluteUrl} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:image' content={image.props.src} />
      <meta property='og:description' content={description} />
    </Fragment>
  )
}

export const Head: React.StatelessComponent<{
  title: string
  description: string
}> = ({ children, title, description }) => {
  return (
    <head>
      <meta charSet='utf-8' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='author' content='Learnk8s' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='@learnk8s' />
      <meta property='fb:app_id' content='398212777530104' />
      <link rel='apple-touch-icon' sizes='180x180' href='assets/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='assets/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='assets/favicon-16x16.png' />
      <link rel='alternate' type='application/rss+xml' title='Subscribe to Learnk8s RSS' href='/rss.xml' />
      <meta property='og:site_name' content='Learnk8s' />
      <meta name='pocket-site-verification' content='1476398dfb5a771a94da9466e0bb43' />
      {children}
    </head>
  )
}

export const Html: React.StatelessComponent<{}> = ({ children }) => {
  return <html lang='en'>{children}</html>
}

export const Body: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <body className='bg-near-white sans-serif'>
      <div className='cf w-100 mw9-l center bg-white'>{children}</div>
    </body>
  )
}

export const Navbar: React.StatelessComponent<{}> = ({}) => {
  return (
    <nav id='main-menu' className='nav bg-sky flex items-center justify-between ph3 pv2'>
      <a href='/' className='logo db w-40 mw2 mw4-ns ml3-l' title='Learnk8s logo'>
        <Learnk8sLogoResponsive />
      </a>
      <div className='mw6 relative'>
        <a href='#main-menu' className='db h2 dn-l' title='Open menu'>
          <span className='hamburger-icon' />
        </a>
        <a href='#' className='z-max reveal pt2 pr2 tc white absolute top-0 right-0 dn-l'>
          <span className='x-icon' />
        </a>
        <ul className='z-999 reveal w5 list pl0 mv0 flex-l items-center-l absolute top-0 right-0 z-1 static-l w-100-l'>
          <li className='ttu mh2 bb bn-l b--white'>
            <a href='/learn' className='white link db b ph1 pv3 pv2-l f5 underline-hover' title='Training & courses'>
              Training & courses
            </a>
          </li>
          <li className='ttu mh2 bb bn-l b--white'>
            <a href='/blog' className='white link db b ph1 pv3 pv2-l f5 underline-hover' title='Blog'>
              Blog
            </a>
          </li>
          <li className='ttu mh2'>
            <a
              href='/kubernetes-free-tools'
              className='white link db b ph1 pv3 pv2-l f5 underline-hover'
              title='Kubernetes free tools'
            >
              Tools
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export const NavbarSlim: React.StatelessComponent<{}> = ({}) => {
  return (
    <nav id='main-menu' className='nav bg-sky flex items-center justify-between ph2 ph3-ns'>
      <a href='/' className='logo db pa1 w2 min-h-100 mw3 w-100-ns' title='Learnk8s logo'>
        <Learnk8sLogoResponsive />
      </a>
      <div className=''>
        <ul className='z-999 w5 list pl0 mv0 flex items-center static w-100'>
          <li className='ttu mh2 lh-solid'>
            <a href='/learn' className='white link db b ph1 pv2 f6 f5-ns underline-hover' title='Training & courses'>
              Training <span className='dn di-ns'>& courses</span>
            </a>
          </li>
          <li className='ttu mh2 lh-solid'>
            <a href='/blog' className='white link db b ph1 pv2 f6 f5-ns underline-hover' title='Blog'>
              Blog
            </a>
          </li>
          <li className='ttu mh2 lh-solid'>
            <a
              href='/kubernetes-free-tools'
              className='white link db b ph1 pv2 f6 f5-ns underline-hover'
              title='Kubernetes free tools'
            >
              Tools
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export const Hamburger: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <div className='hamburger h2 w2 relative'>
      <div className='absolute ' />
    </div>
  )
}

export const Footer: React.StatelessComponent<{}> = ({}) => {
  return (
    <footer className='footer white ph3 ph4-ns pt4 pt5-ns pb3 bg-sky'>
      <section className='flex-ns items-start-ns justify-around-ns pr3-m pr7-l'>
        <div className='dn db-l'>
          <a href='/' className='logo w4 db' title='Learnk8s logo'>
            <Learnk8sLogo />
          </a>
          <p>The Kubernetes training company</p>
        </div>
        <div className='dn db-ns'>
          <h2 className='ttu f6'>Services</h2>
          <ul className='list pl0'>
            {[
              ['Training', '/training'],
              ['Online classrooms', '/kubernetes-online-classroom'],
              ['Self-paced courses', '/academy'],
              ['Consulting', '/consulting'],
            ].map(([title, url]) => {
              return (
                <li>
                  <a href={url} className='db link white pv1 no-underline underline-hover'>
                    {title}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className=''>
          <h2 className='ttu f6'>Company</h2>
          <ul className='list pl0'>
            {[
              ['Contact us', '/contact-us'],
              ['Team', '/about-us'],
              ['Careers', '/careers'],
              ['Blog', '/blog'],
              ['Newsletter', '/newsletter'],
            ].map(([title, url]) => {
              return (
                <li>
                  <a href={url} className='db link white pv1 no-underline underline-hover'>
                    {title}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='pt3 pt0-ns'>
          <h2 className='ttu f6'>Keep in touch</h2>
          <ul className='list pl0'>
            <li className='dib'>
              <a
                href='https://github.com/learnk8s'
                className='link dib w2 h2 icon'
                title='Learnk8s on GitHub'
                rel='noreferrer'
                target='_blank'
              >
                <GithubLogo />
              </a>
            </li>
            <li className='dib'>
              <a
                href='https://twitter.com/learnk8s'
                className='link dib w2 h2 icon'
                title='Learnk8s on Twitter'
                rel='noreferrer'
                target='_blank'
              >
                <TwitterLogo />
              </a>
            </li>
            <li className='dib'>
              <a
                href='https://www.linkedin.com/company/learnk8s/'
                className='link dib w2 h2 icon'
                title='Learnk8s on LinkedIn'
                rel='noreferrer'
                target='_blank'
              >
                <LinkedInLogo />
              </a>
            </li>
            <li className='dib'>
              <a
                href='https://learnk8s-slack-invite.herokuapp.com'
                className='link dib w2 h2 icon'
                title='Learnk8s on Slack'
                rel='noreferrer'
                target='_blank'
              >
                <SlackLogo />
              </a>
            </li>
            <li className='dib'>
              <a
                href='https://t.me/learnk8s'
                className='link dib w2 h2 icon'
                title='Learnk8s on Telegram'
                rel='noreferrer'
                target='_blank'
              >
                <TelegramLogo />
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className='pt2 pt5-ns'>
        <p className='f7 bt b--light-blue pv2 white-70'>
          Copyright &copy; Learnk8s 2017-{new Date().getFullYear()}. Made with ❤︎ in London. View our{' '}
          <a className='link white-70' href='/terms-and-conditions'>
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

export const Learnk8sLogo: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 139 52'>
      <path d='M37.11 24.48c-.993 0-1.833.84-1.833 1.832 0 .993.84 1.833 1.832 1.833.993 0 1.833-.84 1.833-1.833 0-.992-.84-1.832-1.833-1.832' />
      <path d='M37.11 30.468c-1.451 0-2.75-.764-3.437-1.91a52.731 52.731 0 0 0-1.603 4.353c-1.68 4.658-2.825 7.636-4.276 8.705-.764.763-1.756 1.221-2.978 1.221a4.106 4.106 0 0 1-4.123-4.123c0-1.45.763-2.749 1.909-3.436a52.731 52.731 0 0 0-4.353-1.603c-4.657-1.68-7.635-2.825-8.704-4.276-.764-.764-1.222-1.756-1.222-2.978a4.106 4.106 0 0 1 4.123-4.123c1.451 0 2.75.763 3.436 1.909a52.772 52.772 0 0 0 1.604-4.353c1.68-4.657 2.825-7.635 4.276-8.704.763-.764 1.756-1.222 2.978-1.222a4.106 4.106 0 0 1 4.123 4.123c0 1.45-.764 2.749-1.909 3.436 1.45.611 3.13 1.222 4.352 1.604 4.658 1.68 7.636 2.825 8.705 4.276.764.763 1.222 1.756 1.222 2.978 0 2.214-1.833 4.123-4.124 4.123M27.336 2.445c-.993-.993-2.52-.993-3.513 0L1.757 24.512c-.993.993-.993 2.52 0 3.512l22.066 22.067c.993.993 2.52.993 3.513 0l22.067-22.067c.992-.992.992-2.52 0-3.512L27.336 2.445z' />
      <path d='M12.424 24.48c-.992 0-1.832.84-1.832 1.832 0 .993.84 1.833 1.832 1.833.993 0 1.833-.84 1.833-1.833 0-.992-.84-1.832-1.833-1.832m12.343 12.342c-.993 0-1.833.84-1.833 1.833s.84 1.832 1.833 1.832c.992 0 1.832-.84 1.832-1.832 0-.993-.84-1.833-1.832-1.833M21.884 16.87c-.229-.23-.458-.459-.61-.764a52.731 52.731 0 0 0-1.604 4.352c-1.68 4.658-2.825 7.636-4.276 8.705-.23.229-.458.458-.764.61a52.639 52.639 0 0 0 4.353 1.604c4.657 1.68 7.635 2.825 8.704 4.276.23.229.458.458.611.763.61-1.45 1.222-3.13 1.603-4.352 1.68-4.658 2.826-7.635 4.276-8.704.23-.23.459-.459.764-.611a52.731 52.731 0 0 0-4.352-1.604c-4.658-1.603-7.712-2.749-8.705-4.276m2.883-1.111c.992 0 1.832-.84 1.832-1.833s-.84-1.833-1.832-1.833c-.993 0-1.833.84-1.833 1.833 0 1.069.84 1.833 1.833 1.833m36.766 14.957c-.153-.153-.23-.306-.23-.458-.076-.23-.076-.458-.076-.764V16.665l-1.909.306v12.751c0 .993.23 1.756.764 2.215.458.458 1.298.763 2.52.763l.229-1.603c-.306-.077-.535-.077-.764-.153a.693.693 0 0 1-.534-.23m4.847-4.52c.075-.382.152-.763.228-1.069.153-.382.306-.687.535-.916.229-.306.534-.458.84-.687.305-.153.687-.23 1.145-.23.763 0 1.374.306 1.832.84.459.535.688 1.222.611 2.138H66.38zm2.824-4.581c-.61 0-1.221.152-1.832.381-.611.23-1.07.611-1.527 1.07a4.532 4.532 0 0 0-1.07 1.756c-.305.687-.381 1.527-.381 2.443 0 .84.076 1.527.305 2.214a5.01 5.01 0 0 0 .993 1.757c.458.458.992.84 1.68 1.145.687.305 1.45.382 2.367.382a7.88 7.88 0 0 0 1.985-.23c.61-.152.993-.228 1.222-.381l-.23-1.604c-.228.077-.61.23-1.068.306-.458.153-.993.153-1.68.153-1.222 0-2.062-.306-2.596-.84-.535-.535-.917-1.375-.993-2.52h7.254v-.687c0-1.833-.382-3.207-1.145-4.047-.764-.84-1.91-1.298-3.284-1.298m12.826 9.45c-.23.077-.535.077-.84.077h-1.222c-.764 0-1.375-.153-1.756-.382-.459-.23-.688-.764-.688-1.451 0-.382.077-.687.23-.916.152-.23.381-.382.687-.535s.534-.229.916-.229c.305-.076.61-.076.916-.076.458 0 .84 0 1.145.076.306.077.535.077.688.153v3.283zm.992-8.323c-.305-.381-.764-.61-1.298-.84-.535-.229-1.145-.305-1.909-.305-.687 0-1.298.076-1.833.153-.534.076-.992.229-1.221.305l.229 1.604c.229-.077.61-.153 1.069-.306a9.723 9.723 0 0 1 1.68-.153c.458 0 .916.077 1.221.23s.535.305.764.61c.153.23.305.535.382.84.076.306.076.611.076.917v.534c-.076 0-.153 0-.305-.076-.153 0-.306-.077-.459-.077-.152 0-.381-.076-.61-.076h-.611c-.611 0-1.146.076-1.756.153-.535.152-.993.305-1.451.61-.382.23-.764.611-.993.993-.229.458-.382.916-.382 1.527 0 .611.077 1.146.306 1.604s.458.763.84 1.069c.382.229.84.458 1.298.61.534.153 1.069.153 1.68.153.458 0 .84 0 1.298-.076.458 0 .84-.076 1.221-.076.382-.077.688-.077.993-.153.305-.076.535-.076.687-.076v-6.643c0-.611-.076-1.146-.229-1.68a3.876 3.876 0 0 0-.687-1.375m9.128-.94c-.229 0-.382-.076-.61-.076h-.535c-.84 0-1.604.076-2.215.229-.687.153-1.221.305-1.68.458v10.155h1.91v-8.933c.076 0 .305-.077.687-.153.382-.076.687-.076 1.069-.076.534 0 .992.076 1.374.076.382.076.611.153.764.229l.305-1.68c-.076 0-.229-.076-.382-.076-.305-.077-.458-.153-.687-.153m10.503 1.264c-.305-.458-.763-.763-1.374-.993-.534-.229-1.298-.381-2.138-.381-.916 0-1.756.076-2.52.152-.687.153-1.298.23-1.756.382v10.308h1.909v-9.01c.076 0 .153 0 .305-.076.153 0 .306-.076.535-.076.229 0 .382 0 .61-.077h.612c.534 0 .916.077 1.298.23.305.152.61.305.84.61.229.306.381.687.458 1.145.076.459.152.993.152 1.68v5.574h1.91v-5.956c0-.687-.077-1.374-.23-1.985-.076-.61-.305-1.145-.61-1.527m12.032 6.312c-.381-.535-.84-1.07-1.298-1.604a10.45 10.45 0 0 0-1.298-1.298c.84-.84 1.604-1.603 2.291-2.367a618.04 618.04 0 0 1 2.138-2.367h-3.589c-.229.229-.382.534-.687.84-.229.305-.534.61-.84.992-.305.382-.61.688-.916 1.07-.306.381-.611.687-.916.992v-9.01l-3.055.458v15.424h3.055v-4.734c.305.305.687.61 1.069.993.381.381.687.84.992 1.221.306.459.611.84.916 1.298.306.459.535.84.764 1.146h3.512c-.229-.458-.534-.916-.84-1.527-.458-.382-.84-.917-1.298-1.527m9.547.514c-.305.306-.84.535-1.527.535-.382 0-.687-.076-.916-.152a1.663 1.663 0 0 1-.61-.382 2.32 2.32 0 0 1-.383-.535c-.076-.229-.076-.381-.076-.534 0-.535.153-.993.382-1.375.229-.381.61-.687.992-.992.382.152.764.229 1.07.382.305.152.61.305.84.458.228.152.457.381.61.61.153.23.23.535.23.84a2.12 2.12 0 0 1-.612 1.146m-3.13-8.4c.076-.152.152-.381.305-.534.153-.153.306-.305.535-.382.229-.076.458-.152.763-.152.306 0 .611.076.764.152.229.077.382.23.534.382a1.6 1.6 0 0 1 .306.458c.076.153.076.306.076.458 0 .535-.153.917-.382 1.298a2.32 2.32 0 0 1-.992.917c-.764-.306-1.298-.611-1.68-.993-.306-.382-.458-.763-.458-1.222.076 0 .152-.152.229-.381m4.505 3.588c.534-.305.916-.763 1.298-1.374.382-.535.534-1.145.534-1.833 0-.458-.076-.916-.229-1.374-.153-.458-.458-.84-.84-1.222a3.941 3.941 0 0 0-1.45-.916 5.942 5.942 0 0 0-2.138-.382c-.688 0-1.375.077-1.91.306a3.943 3.943 0 0 0-1.45.916c-.382.382-.764.84-.916 1.298-.23.534-.306.993-.306 1.603 0 .688.153 1.299.382 1.757a5.37 5.37 0 0 0 1.298 1.374 7.12 7.12 0 0 0-.764.687c-.229.23-.458.458-.61.764-.23.305-.306.61-.459.916a4.621 4.621 0 0 0-.152 1.145c0 .382.076.84.229 1.299.153.458.458.916.84 1.298a4.42 4.42 0 0 0 1.527.992c.61.23 1.45.382 2.367.382.84 0 1.527-.076 2.214-.305a5.493 5.493 0 0 0 1.604-.917c.458-.381.763-.84.916-1.374.23-.535.305-1.07.305-1.68 0-.764-.152-1.374-.534-1.909-.458-.458-.993-.992-1.756-1.45m11.836 3.327c-.076-.306-.305-.688-.534-.917-.23-.305-.611-.534-1.07-.763-.458-.23-.992-.458-1.68-.764-.305-.153-.61-.229-.84-.305-.228-.077-.38-.23-.534-.306-.152-.076-.229-.152-.229-.305-.076-.076-.076-.23-.076-.306 0-.534.458-.763 1.45-.763.535 0 .993.076 1.375.153.382.076.764.229 1.145.305l.535-2.367c-.382-.153-.84-.229-1.45-.382-.612-.152-1.223-.152-1.91-.152-1.298 0-2.367.305-3.054.916s-1.145 1.374-1.145 2.367c0 .534.076.992.229 1.298.152.382.382.687.61.916.306.23.611.458.993.687.382.23.84.382 1.298.535.611.229 1.07.458 1.375.61.305.153.458.383.458.612 0 .305-.153.534-.382.61-.229.077-.61.153-1.222.153-.534 0-1.069-.076-1.603-.153l-1.604-.458-.534 2.444c.229.076.687.229 1.298.381.61.153 1.45.23 2.367.23 1.45 0 2.596-.306 3.36-.84.763-.535 1.221-1.375 1.221-2.444.306-.229.23-.61.153-.992' />
    </svg>
  )
}

export const Learnk8sLogoResponsive: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <div className='flex-ns justify-between-ns items-center-ns'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 62 61' fill='#FFF' className='w-100 w-34-ns min-h-100'>
        <path d='M45.324 32.699a2.264 2.264 0 01-2.262-2.262 2.264 2.264 0 012.262-2.26 2.264 2.264 0 012.261 2.26 2.264 2.264 0 01-2.261 2.262' />
        <path d='M45.324 25.35a5.08 5.08 0 00-4.285 2.351c-.734-1.782-1.462-3.82-2.016-5.37-2.044-5.722-3.46-9.445-5.325-10.71a5.07 5.07 0 00-3.638-1.535 5.088 5.088 0 00-5.087 5.088 5.08 5.08 0 002.35 4.285c-1.781.734-3.82 1.462-5.37 2.016-5.722 2.044-9.444 3.46-10.71 5.325a5.088 5.088 0 003.553 8.725 5.08 5.08 0 004.285-2.35c.734 1.781 1.463 3.82 2.017 5.37 2.044 5.721 3.46 9.444 5.325 10.71a5.088 5.088 0 008.725-3.553 5.08 5.08 0 00-2.351-4.285c1.782-.734 3.82-1.463 5.37-2.017 5.722-2.044 9.445-3.46 10.71-5.325a5.07 5.07 0 001.535-3.638 5.088 5.088 0 00-5.088-5.087M33.25 59.882a3.08 3.08 0 01-4.355 0L1.623 32.61a3.08 3.08 0 010-4.356L28.895.982a3.08 3.08 0 014.355 0l27.272 27.272a3.08 3.08 0 010 4.356L33.25 59.882z' />
        <path d='M14.797 32.699a2.264 2.264 0 01-2.262-2.262 2.264 2.264 0 012.262-2.26 2.264 2.264 0 012.261 2.26 2.264 2.264 0 01-2.261 2.262M30.06 17.435a2.264 2.264 0 01-2.261-2.261 2.264 2.264 0 012.261-2.26 2.264 2.264 0 012.262 2.26 2.264 2.264 0 01-2.262 2.261M26.507 42.063a5.12 5.12 0 00-.73.901c-.735-1.782-1.464-3.82-2.017-5.37-2.044-5.722-3.46-9.444-5.325-10.71a5.124 5.124 0 00-.901-.731c1.781-.734 3.82-1.463 5.37-2.016 5.721-2.043 9.444-3.46 10.71-5.326.277-.27.521-.572.73-.9.735 1.781 1.463 3.82 2.017 5.37 2.044 5.722 3.46 9.445 5.325 10.71.27.277.573.521.9.73-1.78.735-3.819 1.464-5.37 2.017-5.72 2.044-9.443 3.46-10.71 5.325M30.06 43.44a2.264 2.264 0 012.262 2.261 2.264 2.264 0 01-2.262 2.261 2.264 2.264 0 01-2.261-2.26 2.264 2.264 0 012.261-2.262' />
      </svg>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 98 27' fill='#FFF' className='dn db-ns w-60-ns'>
        <path d='M3.04 19.875a1.325 1.325 0 01-.329-.606 3.827 3.827 0 01-.1-.962V2.51l-2.352.405v15.772c0 1.248.305 2.167.911 2.756.606.59 1.634.902 3.084.935l.328-1.971a6.298 6.298 0 01-.935-.19 1.42 1.42 0 01-.607-.341M8.98 14.289c.051-.455.156-.902.316-1.34.16-.439.383-.825.67-1.163a3.38 3.38 0 011.05-.822c.412-.21.888-.315 1.428-.315.96 0 1.714.34 2.262 1.024.547.682.813 1.555.796 2.616H8.98zm3.489-5.637c-.758 0-1.5.143-2.224.429a5.45 5.45 0 00-1.922 1.29c-.556.573-1.002 1.293-1.34 2.16-.337.87-.505 1.883-.505 3.047 0 .994.13 1.908.391 2.743a5.826 5.826 0 001.201 2.16c.54.608 1.226 1.084 2.06 1.429.835.345 1.824.518 2.971.518.91 0 1.722-.084 2.439-.253.716-.168 1.217-.328 1.504-.48l-.328-1.972c-.288.135-.712.274-1.277.417-.565.144-1.26.215-2.085.215-1.466 0-2.545-.354-3.236-1.062-.691-.707-1.087-1.743-1.188-3.109h9c.015-.135.024-.282.024-.442v-.392c0-2.257-.472-3.938-1.415-5.043-.944-1.103-2.3-1.655-4.07-1.655M28.343 20.254a6.332 6.332 0 01-1.074.14c-.43.024-.922.037-1.48.037-.926 0-1.659-.164-2.198-.493-.54-.328-.81-.913-.81-1.756 0-.456.11-.822.33-1.1.219-.278.493-.497.821-.657.328-.16.69-.266 1.087-.316.396-.05.77-.076 1.125-.076.54 0 .999.03 1.378.088.379.06.652.132.821.215v3.918zm1.201-10.199c-.396-.447-.92-.793-1.568-1.037-.649-.245-1.445-.366-2.388-.366-.826 0-1.593.062-2.3.19-.708.126-1.213.256-1.517.391l.278 1.947c.287-.119.72-.232 1.302-.342a11.16 11.16 0 012.035-.164c.607 0 1.1.088 1.478.265.38.177.679.413.898.708.219.296.37.632.455 1.011.084.38.126.762.126 1.15v.658a9.612 9.612 0 00-.354-.077 42.052 42.052 0 00-.593-.113 8.854 8.854 0 00-.721-.101 7.22 7.22 0 00-.733-.037 9.62 9.62 0 00-2.124.226 5.582 5.582 0 00-1.77.709c-.505.32-.905.741-1.2 1.263-.295.523-.442 1.146-.442 1.87 0 .759.127 1.408.38 1.947.252.54.606.974 1.06 1.302.455.329.995.568 1.618.72a8.681 8.681 0 002.048.228c.522 0 1.049-.021 1.58-.063.53-.042 1.024-.089 1.479-.14.454-.05.862-.104 1.226-.163.362-.06.644-.105.847-.14v-8.215c0-.741-.085-1.42-.253-2.035a3.925 3.925 0 00-.847-1.592M40.856 8.841a11.56 11.56 0 00-.772-.1 7.155 7.155 0 00-.695-.039c-1.028 0-1.954.088-2.78.266-.827.177-1.517.366-2.073.569v12.587h2.35V11.078c.136-.033.418-.097.847-.189.43-.092.864-.14 1.302-.14.674 0 1.226.048 1.656.14.43.092.736.173.923.24l.404-2.048a4.38 4.38 0 00-.468-.113 25.081 25.081 0 00-.694-.127M53.785 10.383c-.414-.53-.965-.944-1.656-1.238-.69-.295-1.558-.442-2.604-.442-1.162 0-2.19.075-3.084.227-.893.152-1.609.295-2.148.43v12.765h2.35V11.027c.085-.015.224-.041.418-.074.193-.034.412-.064.657-.09.244-.025.501-.046.771-.062.269-.018.531-.025.783-.025.624 0 1.146.079 1.568.239.421.16.758.417 1.011.77.253.354.433.82.543 1.39.11.574.165 1.265.165 2.074v6.876h2.35v-7.382c0-.892-.084-1.71-.252-2.451-.168-.742-.46-1.378-.872-1.909M68.711 18.25a39.621 39.621 0 00-1.568-1.962 17.506 17.506 0 00-1.566-1.633 73.593 73.593 0 002.793-2.888c.85-.933 1.722-1.912 2.616-2.938h-4.478c-.236.285-.518.62-.846 1.005-.329.385-.678.791-1.049 1.219-.37.427-.753.859-1.148 1.293-.396.437-.779.856-1.149 1.257V2.51l-3.767.606v19.009h3.767v-5.828c.42.339.845.752 1.273 1.242.43.489.837 1 1.225 1.532a36.3 36.3 0 011.097 1.597c.345.532.651 1.018.92 1.457h4.332a28.896 28.896 0 00-2.452-3.874M80.516 18.812c-.404.423-1.046.634-1.922.634-.454 0-.842-.068-1.163-.203a2.434 2.434 0 01-.783-.507 1.914 1.914 0 01-.443-.67 1.928 1.928 0 01-.138-.673c0-.66.16-1.225.48-1.698.32-.473.717-.887 1.188-1.242.472.151.914.317 1.327.495.413.177.771.38 1.075.607.302.228.542.495.72.799.177.303.265.65.265 1.039 0 .523-.202.996-.606 1.419M76.573 8.497a1.93 1.93 0 01.391-.617c.176-.194.4-.35.67-.468.269-.117.59-.176.96-.176.387 0 .717.063.987.19.268.125.493.282.67.465.177.186.303.383.379.593.075.21.113.407.113.592 0 .64-.142 1.176-.43 1.614-.287.437-.699.823-1.238 1.16-.961-.337-1.64-.74-2.035-1.211-.396-.47-.594-.974-.594-1.512 0-.202.041-.411.127-.63m5.56 4.389c.641-.404 1.175-.955 1.606-1.654.43-.698.644-1.45.644-2.259 0-.556-.106-1.115-.316-1.678a4.105 4.105 0 00-1.024-1.527c-.471-.454-1.074-.828-1.807-1.123-.734-.294-1.614-.442-2.642-.442-.876 0-1.672.14-2.389.417a5.767 5.767 0 00-1.832 1.11 4.878 4.878 0 00-1.175 1.628 4.709 4.709 0 00-.418 1.944c0 .891.173 1.624.518 2.196.346.572.881 1.153 1.606 1.742a9.83 9.83 0 00-.948.81c-.295.286-.56.603-.797.948-.236.347-.42.73-.556 1.152a4.563 4.563 0 00-.202 1.393c0 .49.1 1.025.305 1.607a4.305 4.305 0 001.023 1.607c.48.49 1.112.9 1.895 1.228.784.329 1.765.494 2.945.494 1.028 0 1.933-.132 2.718-.393.783-.26 1.436-.628 1.958-1.101a4.56 4.56 0 001.176-1.657c.261-.634.392-1.33.392-2.089 0-.91-.206-1.708-.62-2.392-.413-.683-1.098-1.337-2.06-1.961M96.807 17.03a2.976 2.976 0 00-.657-1.147c-.312-.344-.737-.666-1.277-.962-.54-.297-1.222-.6-2.047-.906a11.68 11.68 0 01-.998-.42 4.127 4.127 0 01-.62-.356.858.858 0 01-.303-.34 1.028 1.028 0 01-.076-.405c0-.657.59-.986 1.77-.986.64 0 1.216.06 1.732.177.513.118.989.253 1.427.405l.657-2.933c-.438-.168-1.028-.324-1.77-.467a12.262 12.262 0 00-2.324-.215c-1.618 0-2.89.362-3.818 1.087-.926.725-1.39 1.71-1.39 2.957 0 .641.092 1.188.278 1.644.186.454.447.846.783 1.175.338.328.747.61 1.227.846.48.237 1.015.465 1.605.683.759.286 1.322.544 1.694.77.37.228.556.493.556.797 0 .388-.143.65-.43.784-.287.135-.775.202-1.467.202a9.55 9.55 0 01-1.996-.215 12.298 12.298 0 01-1.972-.594l-.632 3.058c.303.136.848.304 1.63.506.784.203 1.766.304 2.945.304 1.804 0 3.199-.337 4.184-1.01.986-.672 1.479-1.664 1.479-2.975a5.1 5.1 0 00-.19-1.463' />
      </svg>
    </div>
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

export const TelegramLogo: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='-6 -6 60 60'>
      <path
        d='M0 24c0 13.255 10.745 24 24 24s24-10.745 24-24S37.255 0 24 0 0 10.745 0 24zm19.6 11l.408-6.118 11.129-10.043c.488-.433-.107-.645-.755-.252l-13.735 8.665-5.932-1.851c-1.281-.393-1.29-1.273.287-1.906l23.118-8.914c1.056-.48 2.075.254 1.672 1.87l-3.937 18.552c-.275 1.319-1.071 1.634-2.175 1.025l-5.997-4.431L20.8 34.4l-.027.026c-.322.314-.59.574-1.173.574z'
        fill='#ffffff'
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
        <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
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
        <img src='assets/plus.svg' alt='Plus' className='w2 h2' />
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
          <img src='assets/small_cargo.svg' alt='Small cargo' className='absolute top-0 right-0' />
        </div>
      </div>
    </section>
  )
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
      <h3 className='f3 f2-l navy pb3 mt0 mt3-ns'>Frequently asked questions</h3>
      <ul className='list pl0'>
        {faqs.map((it, index) => {
          return (
            <li key={index}>
              <h4 className='navy f4 f3-l mb2'>{it.title}</h4>
              <p className='lh-copy black-70'>{transform(toMdast(toVFile({ contents: it.content })), mdast2Jsx())}</p>
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
      <div className={`mv3 mh3 ml4-ns mr2-ns bg-black-025`}>
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
  return <ul className='cf list pl0'>{children}</ul>
}

export const Hero: React.StatelessComponent<{ image: JSX.Element; imageClass: string }> = ({
  children,
  image,
  imageClass,
}) => {
  return (
    <section className='flex-ns items-center justify-center overflow-hidden center'>
      <div className='mw7 ph4'>{children}</div>
      <div className='dn db-l mw6'>
        <div className={`${imageClass} relative`}>
          <img src={image.props.src} alt={image.props.alt} className='absolute top-0 right-0' />
        </div>
      </div>
    </section>
  )
}

export const Subscribe: React.StatelessComponent<{ identifier: string }> = ({ identifier }) => {
  return (
    <div className='mv4 mv5-l'>
      <p className='f2 navy b mt0 measure-narrow'>Don't miss the next article!</p>
      <p className='f4 measure black-80 mv4 lh-copy'>
        Be the first to be notified when a new article or Kubernetes experiment is published.
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
            <label htmlFor='MERGE0' className='dib v-btm f4 measure black-80'>
              Your email address{' '}
            </label>
            <span className='dib bb ml2'>
              <input
                className='pa2 input-reset b--none'
                type='email'
                autoCapitalize='off'
                autoCorrect='off'
                name='MERGE0'
                id='MERGE0'
                size={25}
                defaultValue=''
                placeholder='Your email address'
              />
            </span>
          </div>
        </div>

        <div className=''>
          {
            <button className='dib white bg-blue br1 pv2 ph3 b f5 bn pointer' type='submit'>
              Subscribe ⇢
            </button>
          }
        </div>
        <input type='hidden' name='MERGE2' id='MERGE2' value={identifier} />
        <input type='hidden' name='ht' value='69b0fd8eb9c012c25b28cf22b63612792eb64a30:MTU4OTUyNjkxMC45MDUz' />
        <input type='hidden' name='mc_signupsource' value='hosted' />
      </form>
      <p className='f6 black-60 mt4 mb0 underline'>
        *We'll never share your email address, and you can opt-out at any time.
      </p>
    </div>
  )
}

export const WhatIsLearnk8s: React.StatelessComponent<{ className?: string }> = ({ className }) => {
  return (
    <div className={`mb4 mb5-l mw8 center ${className || ''}`}>
      <ul className='list pl0 flex flex-wrap'>
        <li className='w-50-ns f5 bg-evian br2 ph4'>
          <p className='pb3 f2 b navy mb2 b mt4'>What is Learnk8s?</p>
          <p className='lh-copy f4 measure-narrow pt0 mt0'>
            In-depth Kubernetes training that is practical and easy to understand.
          </p>
        </li>
        {[
          [
            'Instructor-led workshops',
            'Deep dive into containers and Kubernetes with the help of our instructors and become an expert in deploying applications at scale.',
            '/training',
          ],
          [
            'Online courses',
            'Learn Kubernetes online with hands-on, self-paced courses. No need to leave the comfort of your home.',
            '/academy',
          ],
          [
            'Corporate training',
            'Train your team in containers and Kubernetes with a customised learning path — remotely or on-site.',
            '/corporate-training',
          ],
        ].map(([title, description, url]) => {
          return (
            <li className='w-50-ns f5 ph4 pv2'>
              <a className='link dib f3 navy b bb bw1 pb3 mb3 pt3 hover-sky' href={url}>
                ⎈ {title} <span className='f5 v-mid dib pb1 pl1'>❯</span>
              </a>
              <p className='lh-copy f4 measure-narrow pt0 mt0'>{description}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const Author: React.StatelessComponent<{ name: string; link: string; avatar: JSX.Element }> = ({
  name,
  link,
  avatar,
}) => {
  return (
    <div>
      <a href={link} title={name} className='link'>
        <div className='center w3 mb1'>
          <div className=' aspect-ratio aspect-ratio--1x1'>
            <img
              src={avatar.props.src}
              srcSet={avatar.props.srcSet}
              alt={avatar.props.alt}
              className='br-100 w3 dib aspect-ratio--object'
            />
          </div>
        </div>
        <span className='black-50 f6 db'>{name}</span>
      </a>
    </div>
  )
}
