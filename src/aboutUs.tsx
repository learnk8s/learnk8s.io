import { h } from './h'
import { LinkedNode, Sitemap, getAbsoluteUrl } from './sitemap'
import { Navbar, Consultation, Footer, Layout } from './layout'
import { Image, Img, CSSBundle } from './assets'
import unified from 'unified'
const stringify = require('rehype-stringify')

const Assets = {
  daniele: Image({ url: 'assets/about-us/daniele_polencic.jpg', description: 'Daniele Polencic' }),
  miriam: Image({ url: 'assets/about-us/miriam_menegatti.jpg', description: 'Miriam Menegatti' }),
  alessandro: Image({ url: 'assets/about-us/alessandro_moretti.jpg', description: 'Alessandro Moretti' }),
  chris: Image({ url: 'assets/about-us/chris_nesbitt-smith.jpg', description: 'Chris Nesbitt-Smith' }),
  mehdi: Image({ url: 'assets/about-us/mehdi_avdi.jpg', description: 'Mehdi Avdi' }),
  valentin: Image({ url: 'assets/about-us/valentin_ouvrard.jpg', description: 'Valentin Ouvrard' }),
  keith: Image({ url: 'assets/about-us/keith_mifsud.jpg', description: 'Keith Mifsud' }),
  bruno: Image({ url: 'assets/about-us/bruno_bonanno.jpg', description: 'Bruno Bonanno' }),
}

export const Details = {
  type: identity<'aboutUs'>('aboutUs'),
  url: '/about-us',
  seoTitle: 'Team ♦︎ Learnk8s',
  title: 'Team',
  description: 'Experienced software consultants, specialising in Kubernetes.',
  openGraphImage: Image({ url: 'assets/open_graph_preview.png', description: 'Learnk8s preview' }),
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  return unified()
    .use(stringify)
    .stringify(
      <Layout
        website={website}
        seoTitle={currentNode.payload.seoTitle}
        title={currentNode.payload.title}
        description={currentNode.payload.description}
        openGraphImage={currentNode.payload.openGraphImage}
        absoluteUrl={getAbsoluteUrl(currentNode, siteUrl)}
        cssBundle={CSSBundle({
          paths: ['node_modules/tachyons/css/tachyons.css', 'assets/style.css'],
        })}
      >
        <div className='trapezoid-1 white pt3 pt0-ns pb2 pb4-ns'>
          <Navbar root={website} />

          <section className='ph5-l'>
            <div className='w-100'>
              <h1 className='f1 pl3 pl4-ns f-subheadline-l'>About us</h1>
              <h2 className='f4 normal measure-narrow lh-copy ph3 ph4-ns f3-l pb4'>
                Experienced software consultants, specialising in Kubernetes.
              </h2>
            </div>
          </section>
        </div>

        <section>
          <ul className='list pl0 flex flex-wrap justify-center'>
            <Profile
              profile={Assets.daniele}
              name='Daniele Polencic'
              bio='Daniele is a technical consultant and instructor based in London. Daniele is a certified Kubernetes administrator by the Linux Foundation. In the last decade, Daniele trained developers for companies in the e-commerce, finance and public sector.'
              role='Managing director and instructor'
            >
              <GitHub link='https://github.com/danielepolencic' />
              <Twitter link='https://twitter.com/danielepolencic' />
              <LinkedIn link='https://www.linkedin.com/in/danielepolencic' />
            </Profile>
            <Profile
              profile={Assets.miriam}
              name='Miriam Menegatti'
              bio='Miriam is a professional based in London specializing in LNG Trading. She is focused on business development and driving strategic growth. Miriam has also extensive experience in contract negotiation, within the commodity sector.'
              role='Managing director and head of strategy'
            >
              <LinkedIn link='https://www.linkedin.com/in/miriam-menegatti-46263915/' />
            </Profile>
            <Profile
              profile={Assets.bruno}
              name='Bruno Bonanno'
              bio='Bruno has worked as a software engineer for 15+. He spent 5 years teaching at UTN BA before moving to the consulting arena and helping companies such as Morgan Stanley, Barclays and Lloyds deliver better and more secure software.'
              role='Senior software engineer'
            >
              <GitHub link='https://github.com/bbonanno' />
              <LinkedIn link='https://www.linkedin.com/in/bbonanno/' />
            </Profile>
            <Profile
              profile={Assets.alessandro}
              name='Alessandro Moretti'
              bio='Alessandro is a digital marketer passionate about emerging technology and blockchain. He has vast expertise in the digital advertising space having worked with companies such as Coca Cola, The Times and Discovery Channel.'
              role='Head of marketing'
            >
              <LinkedIn link='https://www.linkedin.com/in/alemoretti/' />
            </Profile>
            <Profile
              profile={Assets.mehdi}
              name='Mehdi Avdi'
              bio='Mehdi is a highly experienced software developer and technical lead, with 12+ years industry experience in software engineering practices. Mehdi has helped built infrastructure for companies such as Pearson, Which? and AGCO.'
              role='Instructor'
            >
              <GitHub link='https://github.com/mavdi' />
              <LinkedIn link='https://www.linkedin.com/in/mehdiavdi/' />
            </Profile>
            <Profile
              profile={Assets.chris}
              name='Chris Nesbitt-Smith'
              bio='Chris, a test-fanatic software engineer, always focused on how apply that same level of vigour and assurance to infrastructure. Chris has considerable experience delivering complex, scalable software and training to many UK private, public and third sector organisations.'
              role='Instructor'
            >
              <GitHub link='https://github.com/chrisns' />
              <LinkedIn link='https://www.linkedin.com/in/cnesbittsmith/' />
            </Profile>
            <Profile
              profile={Assets.valentin}
              name='Valentin Ouvrard'
              bio='Valentin is a DevOps engineer with a passion for container technology. Having jumped onto Kubernetes at the beginning of 2015, he has more than 2yrs of production experience in public clouds and bare metal environments alike.'
              role='Kubernetes Specialist'
            >
              <GitHub link='https://github.com/valentin2105' />
              <Twitter link='https://twitter.com/valentin_nc' />
              <LinkedIn link='https://www.linkedin.com/in/valentin-ouvrard-57823aa7' />
            </Profile>
            <Profile
              profile={Assets.keith}
              name='Keith Mifsud'
              bio='Keith has over ten years of professional experience in software development. He built one of the first ever enterprise insurance policy generator software and had worked with clients of the calibre of Renault, Xerox and Hilton Hotels.'
              role='Senior software developer'
            >
              <GitHub link='https://github.com/keithmifsud' />
              <Twitter link='https://twitter.com/keithmifsud' />
              <LinkedIn link='https://www.linkedin.com/in/keith-mifsud-369275157' />
              <World link='https://keith-mifsud.me' />
            </Profile>
          </ul>
        </section>

        <Consultation />
        <Footer root={website} />
      </Layout>,
    )
}

export const Profile: React.StatelessComponent<{ profile: Image; name: string; bio: string; role: string }> = ({
  profile,
  name,
  role,
  bio,
  children,
}) => {
  return (
    <li className='mw5 ma4' id={`${name.replace(/\s/gi, '_').toLowerCase()}`}>
      <div className='relative padding-hack-100'>
        <Img image={profile} className='db shadow-1 absolute top-0 left-0' />
      </div>
      <h2 className='f4 navy mb1'>{name}</h2>
      <p className='black-70 mt0'>{role}</p>
      <p className='black-70 lh-copy'>{bio}</p>
      <div className='cf'>{children}</div>
    </li>
  )
}

export const GitHub: React.StatelessComponent<{ link: string }> = ({ link }) => {
  return (
    <a href={link} target='_blank' rel='noopener' className='link fl w2 h2'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'>
        <path
          fill='#4791CD'
          d='M30 6C16.8 6 6 17 6 30.6 6 41.5 12.9 50.7 22.4 54c1.2.2 1.6-.5 1.6-1.2v-4.2c-6.7 1.5-8.1-3.3-8.1-3.3-1.1-2.8-2.7-3.6-2.7-3.6-2.2-1.5.2-1.5.2-1.5 2.4.2 3.7 2.5 3.7 2.5 2.1 3.8 5.6 2.7 7 2 .2-1.6.8-2.7 1.5-3.3-5.3-.6-10.9-2.7-10.9-12.2 0-2.7.9-4.9 2.5-6.6-.2-.6-1.1-3.1.2-6.5 0 0 2-.7 6.6 2.5 1.9-.5 4-.8 6-.8s4.1.3 6 .8c4.6-3.2 6.6-2.5 6.6-2.5 1.3 3.4.5 5.9.2 6.5 1.5 1.7 2.5 3.9 2.5 6.6 0 9.5-5.6 11.5-11 12.1.9.8 1.6 2.3 1.6 4.6v6.8c0 .7.4 1.4 1.7 1.2C47.2 50.7 54 41.5 54 30.6 54 17 43.3 6 30 6z'
        />
      </svg>
    </a>
  )
}

export const LinkedIn: React.StatelessComponent<{ link: string }> = ({ link }) => {
  return (
    <a href={link} target='_blank' rel='noopener' className='link fl w2 h2'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'>
        <path
          fill='#4791CD'
          d='M14.8 10c-2.9 0-4.8 2-4.8 4.7 0 2.6 1.8 4.7 4.7 4.7h.1c2.9 0 4.8-2.1 4.8-4.7-.2-2.7-2-4.7-4.8-4.7zM11 22.8h7.8V50H11zm29.1-.2c-4.5 0-7.3 2.7-7.8 4.5v-4.3h-8.8c.1 2.3 0 27.2 0 27.2h8.8V35.3c0-.8 0-1.6.2-2.2.6-1.6 1.9-3.3 4.2-3.3 3 0 4.4 2.5 4.4 6.2v14H50V34.9c0-8.4-4.4-12.3-9.9-12.3z'
        />
      </svg>
    </a>
  )
}

export const Twitter: React.StatelessComponent<{ link: string }> = ({ link }) => {
  return (
    <a href={link} target='_blank' rel='noopener' className='link fl w2 h2'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'>
        <path
          fill='#4791CD'
          d='M50.2 12.7c-1.7 1-3.5 1.8-5.5 2.2-1.6-1.8-3.8-2.9-6.3-2.9-4.8 0-8.6 4.1-8.6 9.1 0 .7.1 1.4.2 2.1-7.2-.4-13.5-4-17.8-9.5-.7 1.3-1.2 2.9-1.2 4.6 0 3.2 1.5 5.9 3.8 7.6-1.4 0-2.7-.5-3.9-1.1v.1c0 4.4 3 8.1 6.9 8.9-.7.2-1.5.3-2.3.3-.6 0-1.1-.1-1.6-.2 1.1 3.6 4.3 6.2 8 6.3-3 2.4-6.7 3.9-10.7 3.9-.7 0-1.4 0-2.1-.1 3.8 2.6 8.3 4.1 13.2 4.1C38.4 48 47 34.2 47 22.1v-1.2c1.7-1.3 3.1-2.9 4.3-4.7-1.5.7-3.2 1.2-4.9 1.4 1.7-1 3.1-2.8 3.8-4.9z'
        />
      </svg>
    </a>
  )
}

export const World: React.StatelessComponent<{ link: string }> = ({ link }) => {
  return (
    <a href={link} target='_blank' rel='noopener' className='link fl w2 h2'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 90 90'>
        <path
          d='M44.8 15.2C27.8 15.2 14 29 14 46s13.8 30.8 30.8 30.8S75.6 63 75.6 46c.1-17-13.7-30.8-30.8-30.8zm0 57.8c-3.8 0-7.4-.8-10.7-2.2l14-15.8c.3-.4.5-.8.5-1.3v-5.8c0-1.1-.9-1.9-1.9-1.9-6.8 0-14-7.1-14.1-7.1-.4-.4-.8-.6-1.4-.6h-7.7c-1.1 0-1.9.9-1.9 1.9v11.6c0 .7.4 1.4 1.1 1.7l6.7 3.3v11.3c-7-4.9-11.6-13-11.6-22.2 0-4.1.9-8.1 2.6-11.6h7c.5 0 1-.2 1.4-.6l7.7-7.7c.4-.4.6-.9.6-1.4v-4.7a27.267 27.267 0 0 1 19.5 1.6c-.2.2-.5.4-.7.7-2.2 2.2-3.4 5.1-3.4 8.2 0 3.1 1.2 6 3.4 8.2 2.2 2.2 5.1 3.4 8.2 3.4h.6c.8 3.1 2.3 11.2-.5 22.4v.3c-5 5.2-11.8 8.3-19.4 8.3zm0 0'
          fillRule='evenodd'
          clipRule='evenodd'
          fill='#4791cd'
        />
      </svg>
    </a>
  )
}
