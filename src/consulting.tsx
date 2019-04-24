import React from 'react'
import { LinkedNode, Sitemap, getAbsoluteUrl } from './sitemap'
import { Navbar, Consultation, Footer, Layout, ListItem, Interlude, mailto, MailTo } from './layout.v2'
import { PrimaryButton } from './homepage'
import { ProfessionalService } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { renderToStaticMarkup } from 'react-dom/server'

export const Details = {
  type: 'consulting',
  url: '/consulting',
  seoTitle: 'Consulting ♦︎ Learnk8s',
  title: 'Consulting',
  description: 'Expertise in software development, strategy and operations to help you innovate at speed and scale.',
  openGraphImage: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
} as const

const continuousDeliveryEnquiry: MailTo = {
  subject: 'Learnk8s Consulting',
  body: `Hi Learnk8s,\n\nWe'd like to discuss an opporunity to accelerate our delivery pipeline.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

const cloudMigrationEnquiry: MailTo = {
  subject: 'Learnk8s Consulting',
  body: `Hi Learnk8s,\n\nWe'd like to discuss an opporunity to accelerate our cloud adoption with Kubernetes.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

const cloudDevelopmentEnquiry: MailTo = {
  subject: 'Learnk8s Consulting',
  body: `Hi Learnk8s,\n\nWe'd like to discuss an opporunity to accelerate our development with Kubernetes.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

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
      <JsonLd<ProfessionalService>
        item={{
          '@type': 'ProfessionalService',
          '@context': 'https://schema.org',
          name: 'Learnk8s',
          image: `assets/consulting/learnk8s-consulting.svg`,
          address: ['London, UK', 'Milan, Italy', 'Singapore'],
          telephone: ['+44 07583438976', '+39 02 8088 8106'],
          priceRange: ['1200GBP - 2400GBP per day', '1300EUR - 2600EUR al giorno', '2100SGD - 4200SGD per day'],
        }}
      />
      <div className='trapezoid-1 trapezoid-2-l white pt3 pt0-ns pb5 pb4-ns'>
        <Navbar root={website} />

        <section className='flex-ns items-center-ns ph5-l pt5-l'>
          <div className=''>
            <h1 className='f1 pl3 pl4-ns f-subheadline-l'>Enterprise-ready Kubernetes consulting</h1>
            <h2 className='f4 normal measure-narrow lh-copy ph3 ph4-ns pb3-ns f3-l'>
              Expertise in software development, strategy and operations to help you innovate at speed and scale.
            </h2>
            <a href='#start' className='link dib blue bg-white br1 pa3 b f5 shadow-3 mt4 ml3 ph4 ml4-ns mb3'>
              Get started &#8594;
            </a>
          </div>

          <div className='dn db-l mt4 tr'>
            <div className='padding-hack-100 relative'>
              <img src='assets/consulting/kcsp.png' alt='Kubernetes Certified Service Provider' />
            </div>
            <div className='padding-hack-100 relative'>
              <img src='assets/consulting/cka.png' alt='Certified Kubernetes administrator' />
            </div>
          </div>
        </section>
      </div>

      <section className='content ph3 ph4-ns flex items-center justify-center pt5-ns relative z3'>
        <div className='w-50-l dn db-l tc'>
          <div className='dib'>
            <div className='i-more-cargo-loading relative'>
              <img
                src='assets/consulting/more_cargo_loading.svg'
                alt='Loading cargos'
                className='absolute top-0 right-0'
              />
            </div>
          </div>
        </div>

        <div id='start' className='w-50-l center pt3'>
          <h2 className='f3 navy f2-l measure-narrow'>Accelerating Kubernetes adoption</h2>
          <div className='measure-wide'>
            <p className='lh-copy f4-l black-70'>
              Accelerate your development by leveraging learnk8s expertise in deploying production-ready Kubernetes for
              the hottest start-ups and the largest enterprises. Our engineers will help you:
            </p>
            <ul className='list black-70 pl0 pt2'>
              <ListItem>
                Validate your Kubernetes setup and identify opportunities for resource optimisation and cost-savings
              </ListItem>
              <ListItem>Inspect security risks and propose mitigations for sensitive data</ListItem>
              <ListItem>Refine your CI/CD pipeline to speed up your software delivieries</ListItem>
              <ListItem>Test the cluster for reselience and scaling under high traffic</ListItem>
            </ul>
          </div>
        </div>
      </section>

      <Interlude />

      <section className='pa3 pa4-ns flex-ns items-center-ns justify-center-ns w-100'>
        <div className='ph3'>
          <div className='content measure-wide'>
            <h2 className='f3 navy f2-l'>Enterprise DevOps and continuous delivery</h2>
            <p className='f4-l lh-copy black-70'>
              If you can quickly make small changes to your software, get them to market, and get rapid feedback you are
              reducing the cost and time of delivery. Transforming how you deliver software in this way - making it
              faster, more frequent and scalable - means that you can exponentially increase the value you create for
              your customers.
            </p>
            <PrimaryButton mailto={mailto(continuousDeliveryEnquiry)} text='Get in touch &#8594;' />
          </div>
        </div>

        <div className='ml7-l dn db-ns'>
          <div className='i-containers relative'>
            <img src='assets/consulting/containers.svg' alt='Containers' className='absolute top-0 right-0' />
          </div>
        </div>
      </section>

      <section className='pa3 pa4-ns flex-ns items-center-ns justify-center-ns w-100 bg-evian'>
        <div className='dn db-ns mr7-l'>
          <div className='i-cloud-providers relative'>
            <img
              src='assets/consulting/managed-services.svg'
              alt='AKS, EKS and GKE'
              className='absolute top-0 right-0'
            />
          </div>
        </div>

        <div className='ph3'>
          <div className='content measure-wide'>
            <h2 className='f3 navy f2-l'>Cloud migration and adoption</h2>
            <p className='f4-l lh-copy black-70'>
              The speed, efficiency and cost-effectiveness of public cloud means that it is an invaluable enabler in any
              software innovation drive or digital transformation. Learn how to benefit from the cloud and speed up your
              software development cycle.
            </p>
            <PrimaryButton mailto={mailto(cloudMigrationEnquiry)} text='Get in touch &#8594;' />
          </div>
        </div>
      </section>

      <section className='pa3 pa4-ns flex-ns items-center-ns justify-center-ns w-100'>
        <div className='ph3'>
          <div className='content measure-wide'>
            <h2 className='f3 navy f2-l'>Cloud-native application development</h2>
            <p className='f4-l lh-copy black-70'>
              Cloud-native applications are delivered as flexible, scalable microservices in the cloud, where we can
              fully automate and software-define more of the stack. Leaern how to design, build, deploy and run cloud
              native application platforms, which drive real business value and competitive advantage.
            </p>
            <PrimaryButton mailto={mailto(cloudDevelopmentEnquiry)} text='Get in touch &#8594;' />
          </div>
        </div>

        <div className='ml7-l dn db-ns'>
          <div className='i-team relative'>
            <img src='assets/consulting/team.svg' alt='Team' className='absolute top-0 right-0' />
          </div>
        </div>
      </section>

      <Consultation />
      <Footer root={website} />
    </Layout>,
  )
}
