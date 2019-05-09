import React from 'react'
import { LinkedNode, Sitemap, getAbsoluteUrl } from './sitemap'
import { Navbar, Footer, Layout, ListItem, MailTo, mailto, FAQs, FAQ, Hero } from './layout.v2'
import { material, assets as materialAssets } from './material'
import { Course } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { renderToStaticMarkup } from 'react-dom/server'

export const Details = {
  type: 'academy',
  url: '/academy',
  seoTitle: 'Learnk8s Academy ♦︎ Learnk8s',
  title: 'Kubernetes Online Course',
  description: `A hands-on, online course on mastering Kubernetes, containers and the tools you'll need to build real, working applications at scale.`,
  openGraphImage: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
} as const

const enterprisePackage: MailTo = {
  subject: 'Learnk8s Academy',
  body: `Hi Learnk8s,\n\nI'd like to discuss buying ___ licenses in bulk for the Learnk8s Academy.\n\nKind regards,\n`,
  email: 'hello@learnk8s.io',
}

const faqs: FAQ[] = [
  {
    title: `Can I see a preview of the videos?`,
    content: `This is not a video course. This is a learn-by-doing course. There's no shortcut in learning Kubernetes, you have to put the effort in and practice.`,
  },
  {
    title: `Kubernetes is a vast subject, what topics I won't find in the Learnk8s Academy?`,
    content: `You can master 80% of the topics needed to be proficient with Kubernetes with the Learnk8s Academy. That's production-level proficiency. The Learnk8s Academy doesn't include **yet**:

- The Cilium CNI plugin, but you'll learn about the CNI and how to customise it
- How to set up CI/CD with Kubernetes
- Advanced allocations
- Securing your cluster
- Multi-cloud and multi-data centres deployments`,
  },
  {
    title: 'Can I pause and resume later my monthly subscription?',
    content: `Of course, you can. Please notice that the shortest subscription length is a month, and you can't pause and resume the subscription in the middle of the month.`,
  },
  {
    title: `How do I cancel my subscription?`,
    content: `Drop us an email at [hello@learnk8s.io](mailto:hello@learnk8s.io) and we will cancel your subscription (please note that you won't be billed **from the next instalment**).`,
  },
  {
    title: `What happens when I cancel the monthly subscription?`,
    content: `You won't be able to access the Learnk8s Academy, practice with the content-based material or solve the interactive challenges. However, you can retain all of the code that you generated and you can still chat to us on Slack.`,
  },
  {
    title: 'Do you offer a student discount?',
    content: `Absolutely! [Fill out this form](https://docs.google.com/forms/d/e/1FAIpQLSc8dT07y92OHVH4JjkXAoDvB34nR0i-G2CpwkRfiwph77xTDQ/viewform) with some proof that you are a student and we'll send you a discount code. This applies to anyone in any type of schooling, including evening classes and coding bootcamps!`,
  },
  {
    title: `What if I'm not thrilled?`,
    content: `We want to make sure you get real value out of this so we only want your money if you are happy with the product! If you aren't satisfied, please send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io) with a copy of your receipt and I will refund you.`,
  },
  {
    title: `What are the prerequisites to join the Learnk8s Academy?`,
    content: `You should be familiar with Bash/Powershell, git, curl and SSH. You should be familiar with web servers such as Apache or Nginx. Also, it helps if you used Vagrant and Virtual Box, in the past, but it's only a nice-to-have.`,
  },
  {
    title: 'I have another question!',
    content: `Sure - send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io).`,
  },
]

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
      <script
        type='text/javascript'
        dangerouslySetInnerHTML={{
          __html: `(function() {
window.__insp = window.__insp || [];
__insp.push(['wid', 1190458479]);
var ldinsp = function(){
if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=1190458479&r=' + Math.floor(new Date().getTime()/3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
setTimeout(ldinsp, 0);
})();`,
        }}
      />
      <JsonLd<Course>
        item={{
          '@type': 'Course',
          '@context': 'https://schema.org',
          name: 'Learnk8s Academy',
          courseCode: 'K8SACADEMY',
          description: 'Self-paced Kubernetes online course: become an expert in deploying applications at scale.',
          educationalCredentialAwarded: 'CKA or CKAD (optional)',
          provider: {
            '@type': 'Organization',
            name: 'Learnk8s',
          },
        }}
      />
      <div className='trapezoid-1 trapezoid-2-l white pt3 pt0-ns pb5 pb4-ns'>
        <Navbar root={website} />

        <Hero image={<img src='assets/academy/academy.svg' alt='Learn Kubernetes online' />} imageClass='i-academy'>
          <h1 className='f1 mt1-l pt5-l f-subheadline-l lh-solid'>Self-paced Kubernetes online course</h1>
          <h2 className='f4 normal measure-narrow lh-copy pb3-ns f3-l'>
            A hands-on course on mastering Kubernetes and the tools you'll need to build real, working applications at
            scale.
          </h2>
        </Hero>
      </div>

      <section className='ph3 ph4-ns flex items-center justify-center relative z3'>
        <div className='w-50-l dn db-l tc'>
          <div className='dib'>
            <div className='i-rocks relative'>
              <img
                src='assets/academy/rocks.svg'
                alt='You may feel stranded while learning Kubernetes'
                className='absolute top-0 right-0'
              />
            </div>
          </div>
        </div>

        <div className='w-50-l center pt3'>
          <h2 className='f3 navy f2-l measure-narrow'>Why is Kubernetes so hard?</h2>
          <div className='measure-wide'>
            <p className='lh-copy f4-l black-70'>
              You tried to learn Kubernetes in a weekend and realised that you need a year worth of weekends to master
              it.
            </p>
            <p className='lh-copy f4-l black-70 b'>There's so much to learn that it makes your head spin.</p>
          </div>
        </div>
      </section>

      <section className='ph3 ph4-ns flex items-center justify-center relative'>
        <div className='w-40-l center pt3'>
          <h2 className='f3 navy f2-l measure-narrow'>
            Networking, storage and security are three of the biggest hurdles
          </h2>
          <div className='measure-wide'>
            <p className='lh-copy f4-l black-70'>
              Debugging a fault in Kubernetes can be frustrating when 80% of the issues are network related and you're
              not already a network engineer, a sysadmin, or an ops person.
            </p>
            <p className='lh-copy f4-l black-70'>
              When you don't have the time to tackle networking and system administration,{' '}
              <span className='b'>learning how the traffic flows in the cluster can be confusing.</span>
            </p>
            <p />
          </div>
        </div>

        <div className='w-50-l dn db-l tc'>
          <div className='dib'>
            <div className='i-onfire relative'>
              <img
                src='assets/academy/onfire.svg'
                alt={`In Kubernetes everything feels like it's on fire`}
                className='absolute top-0 right-0'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='ph3 ph4-ns flex items-center justify-center relative'>
        <div className='w-50-l dn db-l tc'>
          <div className='dib'>
            <div className='i-nope relative'>
              <img src='assets/academy/nope.svg' alt='Kubernetes is hard' className='absolute top-0 right-0' />
            </div>
          </div>
        </div>

        <div className='w-40-l center pt3'>
          <h2 className='f3 navy f2-l measure-narrow'>
            Where can you find concise material covering from basics to full deployment, scaling and monitoring?
          </h2>
          <div className='measure-wide'>
            <p className='lh-copy f4-l black-70'>
              There's plenty of tutorials that look simple, but they are nothing but frustrating. You're spending hours
              debugging, reading Github issues, and going around in loops.
            </p>
            <p className='lh-copy f4-l black-70'>
              When the instruction doesn't work, or a component doesn't load, there's always someone recommending
              upgrading and downgrading. <span className='b'>Which one is right? Who should you trust?</span>
            </p>
          </div>
        </div>
      </section>

      <section className='bg-evian pv3 mb5 mt6 mw7 center'>
        <h2 className='f3 f2-l navy tc'>What if</h2>
        <ul className='pa2'>
          <ListItemQuestion>you didn't have to waste time and jump from tutorial to tutorial</ListItemQuestion>
          <ListItemQuestion>you could master the basics as well as learn the nitty-gritty details</ListItemQuestion>
          <ListItemQuestion>
            you could gain <span className='b'>real</span> production knowledge
          </ListItemQuestion>
        </ul>
        <h2 className='f3 f2-l navy tc'>You could</h2>
        <ul className='pa2'>
          <ListItem>learn Kubernetes in time for your next project</ListItem>
          <ListItem>master running and scaling deployments for 30 million requests a day all by yourself</ListItem>
          <ListItem>become a Certified Kubernetes Administrator</ListItem>
        </ul>
      </section>

      <section className='mv5 mv6-ns ph3'>
        <h2 className='f3 f2-l navy measure-wide center tc'>
          Learn and practice deployment and scaling in Kubernetes,{' '}
          <span className='i'>from the comfort of wherever you are</span>, by joining the Learnk8s Academy.
        </h2>
        <div className='mw7 center'>
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
          }
          .feedback {
            column-count: 1;
          }
          @media screen and (min-width: 30em) and (max-width:60em) {
            .feedback {
              column-count: 2;
            }
          }
          @media screen and (min-width: 60em) {
            .feedback {
              column-count: 4;
            }
          }`,
            }}
          />
          <ul className='list numbered black-70 pl0 pt2'>
            <li className='f4-l lh-copy mv3'>You'll learn how to package apps into Linux containers</li>
            <li className='f4-l lh-copy mv3'>Then deploy them into a cluster</li>
            <li className='f4-l lh-copy mv3'>
              And upgrade them to a new version with zero downtime using rolling updates, canary and blue-green
              deployments.
            </li>
            <li className='f4-l lh-copy mv3'>You'll get familiar with Kubernetes core components</li>
            <li className='f4-l lh-copy mv3'>and build your local three-node cluster using kubeadm</li>
            <li className='f4-l lh-copy mv3'>only to take down one node at the time and test the fault tolerance</li>
            <li className='f4-l lh-copy mv3'>
              You'll map the end-to-end journey of network packets from the internet into your apps
            </li>
            <li className='f4-l lh-copy mv3'>
              And learn how to expose your services using load balancers and ingress controllers
            </li>
            <li className='f4-l lh-copy mv3'>
              You'll also learn how to create your Kubernetes network and connect multiple clusters
            </li>
            <li className='f4-l lh-copy mv3'>You'll practice deploying databases and stateful applications</li>
            <li className='f4-l lh-copy mv3'>and how you can manage database clustering using operators</li>
            <li className='f4-l lh-copy mv3'>
              And You'll learn to not repeat yourself using an engine to template resources
            </li>
          </ul>
        </div>
      </section>

      <section className='bg-evian pt4'>
        <p className='f3 f2-l navy b tc'>What's inside</p>
        <ul className='flex flex-wrap pl0 mw7 center ph3'>
          <ListItem className='w-50'>Content-based, hands-on tutorials</ListItem>
          <ListItem className='w-50'>More than 80+ hours of material</ListItem>
          <ListItem className='w-50'>
            Concise lectures with plenty of diagrams <span className='i'>(great if you are a visual learner)</span>
          </ListItem>
          <ListItem className='w-50'>Interactive challenges for beginners and experts</ListItem>
        </ul>

        <div className='ma3 ma5-l pa3 mt0-l'>
          <Module
            preview={[materialAssets.docker.docker, materialAssets.docker.containersVMs]}
            title={`1. ${material.docker.name}`}
            description={material.docker.description}
          >
            <p className='lh-copy measure-wide'>
              You will learn how to package and run applications in Docker containers. The module covers the following
              topics:
            </p>
            <ul>
              {Object.values(material.docker.topics).map((it, index) => (
                <li key={index} className='lh-copy mv1'>
                  {it}
                </li>
              ))}
            </ul>
          </Module>

          <Module
            preview={[materialAssets.zeroToKubernetes.apiInfrastructure, materialAssets.zeroToKubernetes.tetrisPlayer]}
            title={`2. ${material.zeroToKubernetes.name}`}
            description={material.zeroToKubernetes.description}
          >
            <p className='lh-copy measure-wide'>
              You will learn the basics of Kubernetes and how to deploy Linux containers. The module covers the
              following topics:
            </p>
            <ul>
              {Object.values(material.zeroToKubernetes.topics).map((it, index) => (
                <li key={index} className='lh-copy mv1'>
                  {it}
                </li>
              ))}
            </ul>
          </Module>

          <Module
            preview={[
              materialAssets.deploymentStrategies.livenessProbe,
              materialAssets.deploymentStrategies.rollingUpdates,
            ]}
            title={`3. ${material.deploymentStrategies.name}`}
            description={material.deploymentStrategies.description}
          >
            <p className='lh-copy measure-wide'>
              You will learn different techniques to deploy your applications with zero downtime. The module covers the
              following topics:
            </p>
            <ul>
              {Object.values(material.deploymentStrategies.topics).map((it, index) => (
                <li key={index} className='lh-copy mv1'>
                  {it}
                </li>
              ))}
            </ul>
          </Module>

          <Module
            preview={[materialAssets.architecture.clusters, materialAssets.architecture.monzo]}
            title={`4. ${material.architecture.name}`}
            description={material.architecture.description}
          >
            <p className='lh-copy measure-wide'>
              You will learn the core components in Kubernetes and how they work. The module covers the following
              topics:
            </p>
            <ul>
              {Object.values(material.architecture.topics).map((it, index) => (
                <li key={index} className='lh-copy mv1'>
                  {it}
                </li>
              ))}
            </ul>
          </Module>

          <Module
            preview={[materialAssets.networking.e2e, materialAssets.networking.kubeProxy]}
            title={`5. ${material.networking.name}`}
            description={material.networking.description}
          >
            <p className='lh-copy measure-wide'>
              You will learn how the traffic flows inside the cluster. You will also learn how to expose your apps to
              the public internet. The module covers the following topics:
            </p>
            <ul>
              {Object.values(material.networking.topics).map((it, index) => (
                <li key={index} className='lh-copy mv1'>
                  {it}
                </li>
              ))}
            </ul>
          </Module>

          <Module
            preview={[materialAssets.managingState.clusteredDatabase, materialAssets.managingState.distributedStorage]}
            title={`6. ${material.managingState.name}`}
            description={material.managingState.description}
          >
            <p className='lh-copy measure-wide'>
              You will learn how to persist data in Kubernetes. The module covers the following topics:
            </p>
            <ul>
              {Object.values(material.managingState.topics).map((it, index) => (
                <li key={index} className='lh-copy mv1'>
                  {it}
                </li>
              ))}
            </ul>
          </Module>

          <Module
            preview={[materialAssets.templating.helmArchitecture, materialAssets.templating.reusableTemplates]}
            title={`7. ${material.templating.name}`}
            description={material.templating.description}
          >
            <p className='lh-copy measure-wide'>
              You will learn how to template resources for different environments. The module covers the following
              topics:
            </p>
            <ul>
              {Object.values(material.templating.topics).map((it, index) => (
                <li key={index} className='lh-copy mv1'>
                  {it}
                </li>
              ))}
            </ul>
          </Module>
          <script dangerouslySetInnerHTML={{ __html: `(${CreateToggle.toString()})()` }} />
        </div>
      </section>

      {/* <section className='mv6'>
        <h2 className='f3 f2-l navy measure-wide center tc'>This course is for you if</h2>
        <div className='measure-wide f3 center'>
          <ul className='list black-70 pl0 pt2'>
            <ListItem>You wish to deploy applications and understand Kubernetes core concepts</ListItem>
            <ListItem>You can't stand "webinar" style video and are eager to get your hands dirty</ListItem>
            <ListItem>You'd rather run the labs on your computer and not on an interactive online playground</ListItem>
            <ListItem>
              You have to master networking and storage, but are not a sysadmin, network engineer or an ops person
            </ListItem>
          </ul>
        </div>
      </section> */}

      <section className='mv5 mv6-ns ph3'>
        <h2 className='f3 f2-l navy measure-wide center tc'>The Learnk8s Academy Guarantee: Our promise to you</h2>
        <div className='mw7 center'>
          <p className='lh-copy f4-l black-70 b mb1 mt5-l mt4'>
            We care more about our students' success than taking their money.
          </p>
          <p className='lh-copy f4-l black-70 mt1'>
            If you follow the lectures and practice the material and still DO NOT feel like you are making progress 30
            days after you begin doing the work, we will try to work with you to identify what's missing. And if that
            doesn't work, we'll give you a full refund.
          </p>
          <p className='lh-copy f4-l black-70 b mb1 mt5-l mt4'>
            We're honest to the end about the level of effort, skills, and other ingredients required.
          </p>
          <p className='lh-copy f4-l black-70 mt1'>
            This is not a <span className='i'>"master Kubernetes in 3 hours"</span> or{' '}
            <span className='i'>watch someone else deploying containers in Kubernetes</span> video course. Completing
            the Learnk8s Academy's modules takes time, and effort… <span className='b'>but it does work.</span> The
            learning curve is steep, then the plateau of usefulness is very long and smooth. It's a great feeling
            operating Kubernetes after you've mastered it.
          </p>
        </div>
      </section>

      <section className='pb4'>
        <p className='f3 f2-l navy b tc ph3'>There is no better time than now to learn Kubernetes</p>
        <p className='lh-copy f4-l black-70 measure center tc ph3'>
          <span className='b'>Kubernetes is here to stay</span>: companies asuch as Google, IBM and Alibaba are
          investing on it.{' '}
          <a
            href='https://www.hntrends.com/2019/mar-postgresql-vs-mysql-no-longer-close.html?compare=kubernetes&compare=&compare=&compare='
            className='link underline black-70'
            target='_blank'
            rel='noreferrer'
          >
            The demand for engineers grows exponentially
          </a>
          . <span className='b'>Learn Kubernetes now and stay ahead of the game.</span>
        </p>

        <ul className='list pl0 flex-ns items-center justify-center'>
          <li className='w-100 w-third-ns w-30-l'>
            <div className={`mv3 mh3 mr2-ns bg-black-02`}>
              <div className='header ph3 pt1 bb b--light-gray'>
                <h2 className='navy tc mb1'>Monthly plan</h2>
                <h3 className='normal black-70 tc mt0'>Paid monthly</h3>
              </div>
              <div className='flex item-start justify-center dib relative navy tc f2 pt4'>
                <p className='f1 mv0 lh-solid relative'>
                  <span className='paddle-net' data-product='555459'>
                    $109
                  </span>
                </p>
              </div>
              <p className='ttu f6 black-60 tc'>per month</p>
              <div className='tc pb3'>
                <a
                  href='https://academy.learnk8s.io/checkout-1'
                  className='link dib white bg-blue br1 pa3 b f5 shadow-3 mv3 ph4'
                >
                  Buy now &#8594;
                </a>
              </div>
            </div>
          </li>
          <li className='w-100 w-third-ns w-30-l'>
            <div className={`mv3 mh3 mr2-ns bg-evian`}>
              <div className='header ph3 pt1 bb b--light-gray'>
                <h2 className='navy tc mb1'>Yearly plan</h2>
                <h3 className='normal black-70 tc mt0'>Paid yearly</h3>
              </div>
              <div className='flex item-start justify-center dib relative navy tc f2 pt4'>
                <p className='f1 mv0 lh-solid relative'>
                  <span className='paddle-net' data-product='557376'>
                    $81.50
                  </span>
                </p>
              </div>
              <p className='ttu f6 black-60 tc'>per month</p>
              <p className='bg-navy white b pa2 ttu tc'>24% Off montly price</p>
              <div className='tc pb3'>
                <a
                  href='https://academy.learnk8s.io/checkout-12'
                  className='link dib white bg-blue br1 pa3 b f5 shadow-3 mv3 ph4'
                >
                  Buy now &#8594;
                </a>
              </div>
            </div>
          </li>
          <li className='w-100 w-third-ns w-30-l'>
            <div className={`mv3 mh3 mr2-ns bg-black-02`}>
              <div className='header ph3 pt1 bb b--light-gray'>
                <h2 className='navy tc mb1'>Business plan</h2>
                <h3 className='normal black-70 tc mt0'>From 10+ users</h3>
              </div>
              <ul className='list pl0 black-70 ph3'>
                <Item tick={<img src='assets/academy/tick.svg' alt='tick' />}>
                  <p className='mv0 f4-l lh-copy b'>Dedicated support</p>
                </Item>
                <Item tick={<img src='assets/academy/tick.svg' alt='tick' />}>
                  <p className='mv0 f4-l lh-copy b'>Analytics and reports</p>
                </Item>
                <Item tick={<img src='assets/academy/tick.svg' alt='tick' />}>
                  <p className='mv0 f4-l lh-copy b'>Live classes and webinars</p>
                </Item>
                <Item tick={<img src='assets/academy/tick.svg' alt='tick' />}>
                  <p className='mv0 f4-l lh-copy b'>Host the Academy on your cloud</p>
                </Item>
              </ul>
              <div className='tc'>
                <a href={mailto(enterprisePackage)} className='link dib white bg-blue br1 pa3 b f5 shadow-3 mv3 ph4'>
                  Get in touch &#8594;
                </a>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <section className='mv4'>
        <p className='f3 f2-l navy b tc'>Learnk8s trained over 200+ engineers in Kubernetes</p>
        <p className='lh-copy f4-l black-70 measure center tc ph3 pb4'>
          The systems, techniques, and processes you'll learn in the Learnk8s Academy have been developed over 2+ years
          during our hands-on, instructor-led workshops.
        </p>
        <div className='feedback tc'>
          <Feedback
            className='mw5 dib mv3'
            author='Mauricio Salatino'
            role='Activiti Cloud Team Lead'
            description='The course is totally worth the money and time, if you have a team that is getting started with Kubernetes and want to validate the approach that you are taking as well as to level up your knowledge on K8s, this is the way to go.'
          />
          <Feedback
            className='mw5 dib mv3'
            author='Marcello Teodori'
            role='Architect'
            description='This is the course you have to do to put all the pieces in the right place and challenge yourself to really master your knowledge of Kubernetes. Wish I had done it long ago.'
          />
          <Feedback
            className='mw5 dib mv3'
            author='Yawwani Gunawardaba'
            role='Data Scientist'
            description='Good course with practical labs.'
          />
          <Feedback
            className='mw5 dib mv3'
            author='Sandeep Sarthavalli Ramesh'
            role='Software developer'
            description='A good course to get started with Kubernetes with enough confidence to deploy, debug and progress in the world of k8s.'
          />
          <Feedback
            className='mw5 dib mv3'
            author='David Heward'
            role='Senior DevOps Engineer'
            description='A really enjoyable 3-day workshop on Kubernetes. I cemented my understanding of Kubernetes and can now start implementing and furthering my knowledge with real examples and workflows. Next stop, production experience.'
          />
          <Feedback
            className='mw5 dib mv3'
            author='Chris Cooney'
            role='Senior Software Engineer'
            description={`We previously had a couple of people talking about Kubernetes in the pub. Now half the office are raving about it. I don't think reading documentation alone would have done that for us, it needed some people to come in and show us what is possible, validate the ideas we've already had and give us guidance on where to go next. Now everyone has a clear, shared vision and a mission. All that's left is to take the first few steps.`}
          />
          <Feedback
            className='mw5 dib mv3'
            author='Luke Anderson'
            role='Senior IT Engineer'
            description='It is an excellent course covering a wide range of Kubernetes concepts, that will give you more than enough knowledge to go back to experiment and be productive with Kubernetes.'
          />
          <Feedback
            className='mw5 dib mv3'
            author='Mark Gardiner'
            role='Infrastructure Developer'
            description='This is very intensive course, particularly if you are new to cloud computing or networking concepts.'
          />
          <Feedback
            className='mw5 dib mv3'
            author='Przemek Anuszek'
            role='Cloud architect'
            description='The training is very well prepared and also very well performed.'
          />
          <Feedback
            className='mw5 dib mv3'
            author='Eda Meadows'
            role='Polyglott Developer'
            description='Clear, good explanations with good use of diagrams.'
          />
          <Feedback
            className='mw5 dib mv3'
            author='Sara Aspery'
            role='Software Engineer'
            description='Be prepared to learn a lot and enjoy the hands-on sessions.'
          />
          <Feedback
            className='mw5 dib mv3'
            author='Ryan Dawson'
            role='Software Developer'
            description='Learnk8s know this stuff, have put a lot of thought into the course and will put a lot of thought into your questions too!'
          />
          <Feedback
            className='mw5 dib mv3'
            author='Grant Hammond'
            role='Senior Linux Engineer'
            description='Essential knowledge. I mostly enjoyed finding out how the components were doing their thing under the hood and how traffic is/was actually being shunted around.'
          />
          <Feedback
            className='mw5 dib mv3'
            author='Antonio Troina'
            role='Senior Software Developer'
            description='Great experience. Going back to the office with a much better understanding of the topic. Useful exercises, great Q&A session with clarification.'
          />
        </div>
      </section>

      <FAQs faqs={faqs} />

      <Footer root={website} />
      <script src='https://cdn.paddle.com/paddle/paddle.js' />
      <script dangerouslySetInnerHTML={{ __html: `Paddle.Setup({vendor:${'49158'}});` }} />
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

export const Module: React.StatelessComponent<{
  title: string
  description: string
  preview: JSX.Element[]
  className?: string
}> = ({ children, title, description, preview, className }) => {
  const id = title.toLowerCase().replace(/[^\w]+/g, '-')
  return (
    <div className={`mh3 ${className}`}>
      <div className='module pt3 pb4 ph4 shadow-2 mv4 bg-white flex items-start'>
        <div className='w-50-ns'>
          <p className='f3 navy b bb b--black-20 pb3'>{title}</p>
          <div className=''>
            <p className='f5 lh-copy measure-wide'>{description}</p>
            <div className={`controls controls-${id}`}>
              <button
                className='open dib ba b--sky sky pv2 ph3 b f5 br2 hover-bg-evian pointer bg-white'
                data-toggle={`.details-${id},.controls-${id}`}
                data-toggle-collapsed
              >
                View details
              </button>
              <button
                className='close dib ba b--light-gray gray pv2 ph3 b f5 br2 ml2 bg-light-gray hover-bg-moon-gray hover-dark-gray pointer'
                data-toggle={`.details-${id},.controls-${id}`}
              >
                Hide details
              </button>
            </div>
            <div className={`details details-${id}`}>{children}</div>
          </div>
        </div>
        <div className='w-50 flex-ns flex-wrap items-start pt3 dn'>
          {preview.map(it => {
            return (
              <div className='w-80 w-50-l center'>
                <div className='padding-hack-75 relative'>
                  <img src={it.props.src} alt={it.props.alt} className='absolute top-0 right-0' />
                </div>
              </div>
            )
          })}
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

function CreateToggle() {
  function doesntExist<T>(it: T): boolean {
    return !it
  }
  function Toggle(element: Element) {
    var target = element.getAttribute('data-toggle')
    if (!target) {
      return
    }
    var targetElements = target.split(',').map(function(selector) {
      return document.querySelector(selector)
    })
    if (targetElements.some(doesntExist)) {
      return
    }
    if (targetElements[0]!.classList.contains('toggle-collapse')) {
      targetElements.forEach(function(it) {
        return it!.classList.remove('toggle-collapse')
      })
    } else {
      targetElements.forEach(function(it) {
        return it!.classList.add('toggle-collapse')
      })
    }
  }

  ;[].slice.call(document.querySelectorAll('[data-toggle]')).forEach(function(element: Element) {
    element.addEventListener('click', function() {
      Toggle(element)
    })
  })
  ;[].slice.call(document.querySelectorAll('[data-toggle-collapsed]')).forEach(Toggle)
}

export const ListItemQuestion: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <li className='mv3 flex justify-center'>
      <div className='v-top tc'>
        <img src='assets/question.svg' alt='Question' className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f4-l lh-copy'>{children}</p>
      </div>
    </li>
  )
}
