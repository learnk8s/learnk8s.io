import { h } from './h'
import { Img, Image, CSSBundle } from './assets'
import { Sitemap } from './sitemap'
import { Layout, Navbar, Footer } from './layout'
import moment from 'moment'

export const Assets = {
  tick: Image({ url: 'assets/tick.svg', description: 'Tick' }),
}

export const Article: React.StatelessComponent<{
  website: Sitemap
  seoTitle: string
  title: string
  description: string
  openGraphImage: Image
  absolutUrl: string
  authorFullName: string
  authorAvatar: Image
  authorLink: string
  cssBundle: CSSBundle
  publishedDate: string
  lastUpdated?: string
}> = ({
  website,
  seoTitle,
  title,
  description,
  openGraphImage,
  absolutUrl,
  authorFullName,
  authorAvatar,
  authorLink,
  cssBundle,
  publishedDate,
  lastUpdated,
  children,
}) => {
  return (
    <Layout
      website={website}
      seoTitle={seoTitle}
      title={title}
      description={description}
      openGraphImage={openGraphImage}
      absoluteUrl={absolutUrl}
      cssBundle={cssBundle}
    >
      <div className='white pv2 pv0-ns mb4 mb5-ns'>
        <Navbar root={website} />
      </div>
      <div className='tc mb4 db mw4 center'>
        <Author name={authorFullName} avatar={authorAvatar} link={authorLink} />
      </div>
      <article className='ph3 pt0 pb4 mw7 center'>
        <h1 className='navy tc f2 f1-ns'>{title}</h1>
        <p className='f7 black-60 tc ttu'>Published in {moment(publishedDate).format('MMMM YYYY')}</p>
        {lastUpdated ? (
          <p className='f7 black-60 tc ttu b'>
            <Img image={Assets.tick} className='w1 h1 v-mid' /> Updated in {moment(lastUpdated).format('MMMM YYYY')}
          </p>
        ) : (
          ''
        )}
        <Img image={openGraphImage} className='pt2' />
        <hr className='w3 center b--navy mv4 mb5-ns' />
        {children}
      </article>
      <Footer root={website} />
    </Layout>
  )
}

export const Author: React.StatelessComponent<{ name: string; link: string; avatar: Image }> = ({
  name,
  link,
  avatar,
}) => {
  return (
    <div>
      <a href={link} title={name} className='link'>
        <Img image={avatar} className='br-100 w3 dib' />
        <span className='black-50 f6 db'>{name}</span>
      </a>
    </div>
  )
}

export const RelatedConentContainer: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <div>
      <h2 className='f2 pt4 pb2'>That's all folks!</h2>
      <p className='lh-copy measure-wide f4'>
        If you enjoyed this article, you might find the following articles interesting:
      </p>
      <ul className=''>{children}</ul>
    </div>
  )
}

export const RelatedContentItem: React.StatelessComponent<{}> = ({ children }) => {
  return <li className='mv3 f4-l lh-copy'>{children}</li>
}
